<template>
  <div v-if="isLoggedIn" class="w-full min-h-[50vh] flex flex-col gap-8 justify-center items-center">

    <div class="flex gap-4">
      <button v-if="!rickroll" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-500" @click="start">
        Show Portfolio
      </button>

      <button v-if="!rickroll" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-500" @click="start">
        Show Bank
      </button>

      <button v-if="!rickroll" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-500" @click="start">
        Show Ehre
      </button>
    </div>

    <div v-if="rickroll">

      <vue-particles
          id="rickroll"
          :options="options"
          :particles-init="particlesInit"
      />

      <h1 class="text-center mb-4">
        Hops gno {{ user?.firstName }}
      </h1>

      <video playsinline autoplay>
        <source :src="video" type="video/mp4" />
      </video>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/store/auth';
import { loadFull } from 'tsparticles';
import video from '~/assets/video/rickroll.mp4';
import { storeToRefs } from 'pinia';

const { isLoggedIn, user } = storeToRefs(useAuth());
const { httpPost } = useHttp();

const rickroll = ref(false);

const start = async () => {
  rickroll.value = true;
  await httpPost(`/rickrolled/${user.value?.firstName}`);
};

const particlesInit = async (engine) => {
  await loadFull(engine);
}

const options = {
  "fullScreen": {
    "zIndex": 1
  },
  "particles": {
    "number": {
      "value": 0
    },
    "color": {
      "value": [
        "#00FFFC",
        "#FC00FF",
        "#fffc00"
      ]
    },
    "shape": {
      "type": [
        "circle",
        "square"
      ],
      "options": {}
    },
    "opacity": {
      "value": 1,
      "animation": {
        "enable": true,
        "minimumValue": 0,
        "speed": 2,
        "startValue": "max",
        "destroy": "min"
      }
    },
    "size": {
      "value": 4,
      "random": {
        "enable": true,
        "minimumValue": 2
      }
    },
    "links": {
      "enable": false
    },
    "life": {
      "duration": {
        "sync": true,
        "value": 5
      },
      "count": 1
    },
    "move": {
      "enable": true,
      "gravity": {
        "enable": true,
        "acceleration": 10
      },
      "speed": {
        "min": 10,
        "max": 20
      },
      "decay": 0.1,
      "direction": "none",
      "straight": false,
      "outModes": {
        "default": "destroy",
        "top": "none"
      }
    },
    "rotate": {
      "value": {
        "min": 0,
        "max": 360
      },
      "direction": "random",
      "move": true,
      "animation": {
        "enable": true,
        "speed": 60
      }
    },
    "tilt": {
      "direction": "random",
      "enable": true,
      "move": true,
      "value": {
        "min": 0,
        "max": 360
      },
      "animation": {
        "enable": true,
        "speed": 60
      }
    },
    "roll": {
      "darken": {
        "enable": true,
        "value": 25
      },
      "enable": true,
      "speed": {
        "min": 15,
        "max": 25
      }
    },
    "wobble": {
      "distance": 30,
      "enable": true,
      "move": true,
      "speed": {
        "min": -15,
        "max": 15
      }
    }
  },
  "emitters": {
    "life": {
      "count": 0,
      "duration": 0.1,
      "delay": 0.4
    },
    "rate": {
      "delay": 0.1,
      "quantity": 150
    },
    "size": {
      "width": 0,
      "height": 0
    }
  }
};

</script>
