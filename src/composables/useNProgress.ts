import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function useNProgress() {
  function start() {
    if (!NProgress.isStarted())
      NProgress.start()
  }
  function done() {
    NProgress.done()
  }
  return { start, done }
}
