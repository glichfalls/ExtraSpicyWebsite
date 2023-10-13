<template>
  <div v-if="isLoggedIn" class="w-full min-h-[50vh] flex flex-col gap-8 justify-center items-center">

    <div class="flex flex-col lg:flex-row gap-4">
      <button v-if="!rickroll" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-500" @click="start">
        NFT
      </button>
    </div>

    <div v-if="rickroll">

      <div v-if="!videoLoaded">
        <div class="flex justify-center items-center">
          <i class="pi pi-spin pi-spinner"></i>
        </div>
      </div>

      <div v-else>
        <vue-particles
          id="rickroll"
          :options="options"
          :particles-init="particlesInit"
        />

        <h1 class="text-center mb-4">
          Hops gno {{ user?.firstName }}
        </h1>
      </div>

    </div>

    <video :class="!videoElement || !rickroll ? 'hidden' : ''" playsinline ref="videoElement">
      <source :src="video" type="video/mp4" />
    </video>

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
const videoElement = ref<HTMLVideoElement|null>(null);
const videoLoaded = ref(false);

const start = async () => {
  videoElement.value?.play();
  rickroll.value = true;
  await httpPost(`/rickrolled/${user.value?.firstName}`);
};

const preloadVideo = () => {
  if (videoElement.value !== null) {
    videoElement.value.addEventListener('loadeddata', () => {
      videoLoaded.value = true;
    });
    videoElement.value.load();
  }
};

onMounted(preloadVideo);

const particlesInit = async (engine: any) => {
  await loadFull(engine);
}

const options = {
  fullScreen: {
    zIndex: 1
  },
  particles: {
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
    life: {
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
