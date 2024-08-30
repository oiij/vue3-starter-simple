export function useWebRtcOffer(dataChannelLabel: string) {
  const connection = new RTCPeerConnection()
  const channel = connection.createDataChannel(dataChannelLabel)

  function createOffer(): Promise<RTCSessionDescription | null> {
    return new Promise((resolve, reject) => {
      connection.createOffer()
        .then(offer => connection.setLocalDescription(offer))
        .then(() => {
          return resolve(connection.localDescription)
        })
        .catch(error => reject(error))
    })
  }
  return {
    connection,
    channel,
    createOffer,
  }
}

export function useWebRtcAnswer() {
  const connection = new RTCPeerConnection()
  function createAnswer(localDescription: RTCSessionDescription): Promise<RTCSessionDescription | null> {
    return new Promise((resolve, reject) => {
      connection.setRemoteDescription(localDescription)
        .then(() => connection.createAnswer())
        .then(answer => connection.setLocalDescription(answer))
        .then(() => {
          return resolve(connection.localDescription)
        })
        .catch(error => reject(error))
    })
  }
  return {
    connection,
    createAnswer,
  }
}
