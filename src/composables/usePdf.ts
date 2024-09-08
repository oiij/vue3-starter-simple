/// <reference types="@types/wicg-file-system-access" />
import { saveAs } from 'file-saver'
import { jsPDF as JsPDF } from 'jspdf'
import JsZip from 'jszip'
import { nanoid } from 'nanoid'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'

GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${`4.5.136`}/build/pdf.worker.min.mjs`
function openFileAsBuffer(): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    window.showOpenFilePicker({
      types: [
        { accept: { 'application/pdf': ['.pdf'] } },
      ],
    }).then(([fileHandle]) => {
      fileHandle.getFile().then((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          return resolve(reader.result as ArrayBuffer)
        }
        reader.onerror = () => {
          return reject(reader.error?.message)
        }
        reader.readAsArrayBuffer(file)
      }).catch(e => reject(e))
    }).catch(e => reject(e))
  })
}
function readPdf(buffer: ArrayBuffer): Promise<PDFDocumentProxy> {
  return new Promise((resolve, reject) => {
    getDocument(buffer).promise.then(doc => resolve(doc)).catch(e => reject(e))
  })
}
function getPdfPages(pdf: PDFDocumentProxy): Promise<PDFPageProxy[]> {
  return new Promise((resolve, reject) => {
    const pages = Array.from({ length: pdf.numPages }).map((m, i) => pdf.getPage(i + 1))
    Promise.all(pages).then(res => resolve(res)).catch(e => reject(e))
  })
}
function createCanvas(width: number, height: number, id: string) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.id = id
  canvas.width = width
  canvas.height = height
  return {
    canvas,
    ctx,
  }
}
function page2Canvas(page: PDFPageProxy, id: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const pixelRatio = Math.max(window.devicePixelRatio, 2)
    const viewport = page.getViewport({ scale: pixelRatio })
    const { width, height } = viewport
    const { canvas, ctx } = createCanvas(width, height, `page-${id}-${page._pageIndex}`)
    canvas.style.width = `${width / pixelRatio}px`
    canvas.style.height = `${height / pixelRatio}px`
    page.render({
      canvasContext: ctx,
      viewport,
    }).promise.then(() => resolve(canvas)).catch(e => reject(e))
  })
}
function saveAsPdf(canvases: HTMLCanvasElement[], fileName: string) {
  let doc: JsPDF | null = null

  canvases.forEach((canvas, i) => {
    const width = Number((canvas.width / 2 / 72 * 25.4).toFixed())
    const height = Number((canvas.height / 2 / 72 * 25.4).toFixed())

    if (!doc) {
      doc = new JsPDF({
        unit: 'mm',
        format: [width, height],
      })
    }
    if (i > 0) {
      doc.addPage([width, height])
    }
    doc.setPage(i + 1)

    doc.addImage(canvas, 'PNG', 0, 0, width, height)

    if (i === canvases.length - 1) {
      doc.save(fileName)
    }
  })
}
function canvas2Blob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (blob) {
          return resolve(blob)
        }
        return reject(new Error('canvas to blob error'))
      })
    }
    catch (error) {
      return reject(error)
    }
  })
}
function saveAsFile(canvases: HTMLCanvasElement[], fileName: string) {
  return new Promise((resolve, reject) => {
    const zip = new JsZip()
    Promise.all(canvases.map(canvas => canvas2Blob(canvas))).then((blobs) => {
      blobs.forEach((blob, i) => {
        zip.file(`${canvases[i].id}.jpg`, blob)
      })
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${fileName}.zip`)
        return resolve(blobs)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

export function usePdf() {
  const domRef = ref<HTMLElement | null>(null)
  function clear() {
    if (domRef.value)
      domRef.value.innerHTML = ''
  }
  async function open(): Promise<{ buffer: ArrayBuffer, pdf: PDFDocumentProxy, pages: PDFPageProxy[], canvases: HTMLCanvasElement[] }> {
    clear()
    try {
      const buffer = await openFileAsBuffer()
      const pdf = await readPdf(buffer)
      const pages = await getPdfPages(pdf)
      const nid = nanoid()
      const canvases = await Promise.all(pages.map(m => page2Canvas(m, nid)))
      if (domRef.value) {
        canvases.forEach((canvas) => {
          domRef.value?.appendChild(canvas)
        })
      }
      return {
        buffer,
        pdf,
        pages,
        canvases,
      }
    }
    catch (error) {
      return Promise.reject(error)
    }
  }
  onUnmounted(() => {
    clear()
  })
  return {
    domRef,
    open,
    clear,
    saveAsPdf,
    saveAsFile,
  }
}
