<template>
  <div class="container">
    <button
      type="button"
      class="btns__btn__nav"
      :disabled="startBtn == 1"
      @click="nextNumLeft"
    >
      <span class="material-icons"> chevron_left </span>
    </button>
    <span class="btns" v-for="item in totalPages" :key="item">
      <div
        class="btns__btn"
        @click="showNum(item)"
        :class="[backgroundColorBts(item) ? 'btns__btn--active' : '']"
        v-if="Math.abs(item - startBtn) < 3 || item == totalPages || item == 0"
      >
        {{ item }}
      </div>
    </span>
    <button
      type="button"
      class="btns__btn__nav"
      :disabled="startBtn == totalPages"
      @click="nextNumRight"
    >
      <span class="material-icons">chevron_right </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationButtons",

  props: {
    totalPages: {
      type: Number,
      required: true,
    },

    startBtn: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    function showNum(item) {
      emit("showNum", item);
    }

    function nextNumLeft() {
      emit("nextNumLeft", props.startBtn);
    }

    function nextNumRight() {
      emit("nextNumRight", props.startBtn);
    }

    function backgroundColorBts(index) {
      return [props.startBtn].includes(index);
    }

    return {
      backgroundColorBts,
      showNum,
      nextNumLeft,
      nextNumRight,
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  height: 40px;

  .btns {
    &__btn {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      border: solid 1px #a9b1bd;
      background-color: #ffffff;
      color: #a9b1bd;
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      margin-right: 5px;

      @media (width: 320px) {
        width: 25px;
        height: 25px;
        margin-left: 7px;
        font-size: 9px;
      }

      @media (width: 375px) {
        width: 30px;
        height: 30px;
        margin-left: 8px;
        font-size: 12px;
      }
      &--active {
        background-color: #11b0c8;
        color: #ffffff;
        width: 40px;
        height: 40px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;

        @media (width: 320px) {
          width: 25px;
          height: 25px;
          margin: auto;
          margin-left: 7px;
        }

        @media (width: 375px) {
          width: 30px;
          height: 30px;
          margin-left: 8px;
        }
      }
      &__nav {
        width: 39.5px;
        height: 39.5px;
        border-radius: 4px;
        border: solid 1px #a9b1bd;
        background-color: #ffffff;
        color: #a9b1bd;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        @media (width: 320px) {
          width: 24px;
          height: 24px;
          margin-left: 8px;
        }
        @media (width: 375px) {
          width: 29.5px;
          height: 29.5px;
          margin-left: 8px;
        }
        .material-icons {
          font-size: 12px;
          cursor: pointer;
          @media (width: 320px) {
            font-size: 7px;
          }
          @media (width: 375px) {
            font-size: 9px;
          }
        }
        &:disabled {
          cursor: auto;
        }
      }
    }
  }
}
</style>
