<template>
  <div class="container">
    <div class="searchContainer">
      <div class="searchContainer__name">Search</div>
      <div class="searchContainer__searchInput">
        <input
          type="text"
          class="searchContainer__searchInput__input"
          name="input"
          autofocus
          @input="emitData"
          v-model="inputsValue"
        />
        <div class="searchContainer__searchInput__searchBtn">
          <button
            class="searchContainer__searchInput__searchBtn__btn"
            :class="{
              'searchContainer__searchInput__searchBtn__btn--changeColor':
                inputsValue,
            }"
          >
            <span class="material-icons">search</span>
          </button>
        </div>
      </div>
      <div class="searchContainer__sort">
        <div class="searchContainer__sort__name">Sort</div>
        <div class="searchContainer__sort__icon" @click="sortData">
          <span v-if="!sortActive" class="material-icons">
            arrow_drop_down
          </span>
          <span v-else class="material-icons"> arrow_drop_up </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SearchComponent",

  props: {
    text: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const inputsValue = ref();
    const active = ref(false);
    const sortActive = ref(false);

    function emitData() {
      sortActive.value = false;
      emit("searchItems", inputsValue.value);
    }

    function sortData() {
      sortActive.value = !sortActive.value;
      emit("sortedData", sortActive.value);
    }

    return {
      active,
      inputsValue,
      emitData,
      sortActive,
      sortData,
    };
  },
};
</script>
<style scoped lang="scss">
.container {
  margin: auto;
  max-width: 400px;
  height: auto;
  .searchContainer {
    height: 56px;
    border: solid 1px #a9b1bd;
    border-radius: 12px;
    display: grid;
    grid-template-columns: 80px 240px 80px;

    @media (width: 320px) {
      max-width: 300px;
      display: grid;
      grid-template-columns: 80px 130px 40px;
      height: 30px;
      font-size: 6px;
      margin: auto;
    }
    @media (width: 375px) {
      max-width: 355px;
      display: grid;
      grid-template-columns: 100px 150px 60px;
      height: 30px;
      font-size: 9px;
      margin: auto;
    }
    @media (width: 425px) {
      max-width: 415px;
      display: grid;
      grid-template-columns: 100px 210px 100px;
      height: 30px;
      font-size: 11px;
    }
    &__name {
      border-right: solid 1px #a9b1bd;
      color: #a9b1bd;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      @media (width: 320px) {
        font-size: 8px;
      }
    }

    &__searchInput {
      max-width: 252px;
      display: grid;
      grid-template-columns: auto 47px;
      @media (width: 320px) {
        max-width: 80px;
        display: grid;
        grid-template-columns: 105px 22px;
      }
      @media (width: 375px) {
        max-width: 150px;
        display: grid;
        grid-template-columns: 125px 25px;
      }
      @media (width: 425px) {
        max-width: 200px;
        display: grid;
        grid-template-columns: 185px 22px;
      }
      &__input {
        border-style: none;
        outline: none;
        color: #a9b1bd;
        font-weight: 500;
        font-size: 16px;
        @media (width: 320px) {
          font-size: 8px;
        }
        @media (width: 375px) {
          font-size: 9px;
        }
        @media (width: 425px) {
          font-size: 11px;
          border-bottom: solid 1px #a9b1bd;
        }
      }
      &__searchBtn {
        display: flex;
        justify-content: center;
        align-content: center;
        &__btn {
          border-style: none;
          background-color: #ffffff;
          color: #11b0c8;

          @media (width: 425px) {
            font-size: 11px;
            border-bottom: solid 1px #a9b1bd;
          }
          .material-icons {
            @media (width: 320px), (width: 375px), (width: 425px) {
              font-size: 18px;
            }
          }
          &--changeColor {
            color: #a9b1bd;
          }
        }
      }
    }

    &__sort {
      display: grid;
      grid-template-columns: 50px 10px;
      border-left: solid 1px #a9b1bd;

      @media (width: 320px) {
        max-width: 80px;
        display: grid;
        grid-template-columns: 50px 5px;
      }

      @media (width: 375px) {
        max-width: 80px;
        display: grid;
        grid-template-columns: 60px 10px;
      }

      &__name {
        margin: auto;
        @media (width: 320px) {
          font-size: 8px;
        }
      }

      &__icon {
        margin: auto;

        .material-icons {
          @media (width: 320px), (width: 375px) {
            font-size: 15px;
          }
          &:hover {
            cursor: pointer;
            color: #11b0c8;
          }
        }
      }
    }
  }
}
</style>
