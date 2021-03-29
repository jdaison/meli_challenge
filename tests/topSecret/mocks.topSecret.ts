export const badSatellites = {
  stuffs: [
    {
      name: "kenobi",
      distance: 100.0,
      message: ["este", "", "", "mensaje", ""]
    },
  ]
}

export const oneSatellite = {
  satellites: [
    {
      name: "kenobi",
      distance: 100.0,
      message: ["este", "", "", "mensaje", ""]
    },
  ]
}

export const satellitesInvalidName = {
  satellites: [
    {
      name: "john",
      distance: 100.0,
      message: ["este", "", "", "mensaje", ""]
    },
    {
      name: "skywalker",
      distance: 115.5,
      message: ["", "es", "", "", "secreto"]
    },
    {
      name: "sato",
      distance: 142.7,
      message: ["este", "", "un", "", ""]
    }
  ]
}

export const satellitesInvalidDistance = {
  satellites: [
    {
      name: "skywalker",
      distance: -100.0,
      message: ["este", "", "", "mensaje", ""]
    },
    {
      name: "skywalker",
      distance: 115.5,
      message: ["", "es", "", "", "secreto"]
    },
    {
      name: "sato",
      distance: 142.7,
      message: ["este", "", "un", "", ""]
    }
  ]
}

export const satellitesInvalidMessage = {
  satellites: [
    {
      name: "skywalker",
      distance: 100.0,
      message: []
    },
    {
      name: "skywalker",
      distance: 115.5,
      message: ["", "es", "", "", "secreto"]
    },
    {
      name: "sato",
      distance: 142.7,
      message: ["este", "", "un", "", ""]
    }
  ]
}

export const satellites = {
  satellites: [
    {
      name: "kenobi",
      distance: 2,
      message: ["este", "", "", "mensaje", ""]
    },
    {
      name: "skywalker",
      distance: 2,
      message: ["", "es", "", "", "secreto"]
    },
    {
      name: "sato",
      distance: 2,
      message: ["este", "", "un", "", ""]
    }
  ]
}

export const resultPosition = {
  x: 3.75,
  y: 1.25,
}

export const resultResponse = {
  position: resultPosition,
  message: "este es un mensaje secreto",
}