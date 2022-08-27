import BIRDS from "vanta/dist/vanta.birds.min"
import CLOUDS from "vanta/dist/vanta.clouds.min"
import FOG from "vanta/dist/vanta.fog.min"
import HALO from "vanta/dist/vanta.halo.min"
import RINGS from "vanta/dist/vanta.rings.min"
import WAVES from "vanta/dist/vanta.waves.min"
import * as THREE from 'three'

export const randomEffect = (el: HTMLDivElement) => {
  let randomNum = Math.random() * 6

  if (randomNum >= 0 && randomNum < 1) {
    return BIRDS({
      el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      birdSize: 2.90,
      wingSpan: 24.00,
      THREE: THREE
    })
  } else if (randomNum >= 1 && randomNum < 2) {
    return FOG({
      el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      THREE: THREE
    })
  } else if (randomNum >= 2 && randomNum < 3) {
    return WAVES({
      el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      THREE: THREE
    })
  } else if (randomNum >= 3 && randomNum < 4) {
    return CLOUDS({
      el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      THREE: THREE
    })
  } else if (randomNum >= 4 && randomNum < 5) {
    RINGS({
      el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      THREE: THREE
    })
  } else {
    HALO({
      el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      THREE: THREE
    })
  }
}