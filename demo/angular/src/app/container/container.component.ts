import { Component, OnInit } from '@angular/core';
import type { Container, Engine } from "tsparticles-engine";
import { MoveDirection, OutMode } from "tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: [ './container.component.css' ]
})
export class ContainerComponent implements OnInit {
  id = 'tsparticles';
  options = {
    background: {
      color: {
        value: '#0d47a1'
      }
    },
    fullScreen: {
      zIndex: -1
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push'
        },
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
          speed: 3
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: '#ffffff'
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: false,
        speed: 6,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: 'circle'
      },
      size: {
        random: true,
        value: 5
      }
    },
    detectRetina: true
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);

    console.log(loadFull);
  }

  particlesLoaded(container: Container): void {
    console.log(container);
  }
}
