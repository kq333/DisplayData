<template>
  <div class="container">
    <div class="table">
      <div
        class="table__content"
        v-for="item in displaySearchedValue"
        :key="item"
      >
        <div class="table__content__delateBtn">
          <button
            class="table__content__delateBtn__btn"
            @click="delateItem(item)"
          >
            <span class="material-icons"> clear </span>
          </button>
        </div>
        <div class="table__content__title">
          <h4>{{ item.title }}</h4>
        </div>
        <div class="table__content__textContent">
          <div
            class="table__content__textContent__text"
            :class="[
              MoreLessText(item.id)
                ? 'table__content__textContent__text'
                : 'table__content__textContent__text--less',
            ]"
          >
            {{ item.body }}
          </div>
          <button
            class="table__content__textContent__btnShow"
            :class="[
              MoreLessText(item.id)
                ? 'table__content__textContent__btnShow--less'
                : 'table__content__textContent__btnShow--more',
            ]"
            @click="showText(item)"
          ></button>
          <div
            class="table__content__textContent__author"
            :class="[
              MoreLessText(item.id)
                ? 'table__content__textContent__author'
                : 'table__content__textContent__author--hide',
            ]"
          >
            Author: User {{ item.id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "TableContent",

  setup() {
    const store = useStore();

    const displayData = computed(() => store.state.arrayData);
    const clickedShowValue = computed(() => store.state.showHideId);
    const findValue = computed(() => store.state.findValue);
    const isSort = computed(() => store.state.isSort);

    const displaySearchedValue = computed(() => {
      if (isSort.value == true) {
        return [...store.state.arrayData].sort((a, b) => b.id - a.id);
      } else {
        return store.state.arrayData.filter((elem) =>
          elem.body.toLowerCase().includes(findValue.value)
        );
      }
    });

    function showText(item) {
      this.store.commit("showHideText", item.id);
    }

    function delateItem(item) {
      this.store.commit("delateItem", item);
    }

    function MoreLessText(item) {
      return clickedShowValue.value.includes(item);
    }

    return {
      store,
      displayData,
      showText,
      delateItem,
      clickedShowValue,
      MoreLessText,
      findValue,
      displaySearchedValue,
      isSort,
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1000px;
  height: auto;
  margin: auto;

  .table {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    @media (width: 320px) {
      width: 300px;
      margin: auto;
    }
    @media (width: 375px) {
      width: 350px;
      margin: auto;
    }
    @media (width: 425px) {
      width: 400px;
      margin: auto;
    }

    &__content {
      border: 1px solid #a9b1bd;
      border-radius: 4px;
      padding: 5px;
      min-height: 100px;

      &__title {
        display: flex;
        justify-content: center;
        text-align: center;
      }

      &__delateBtn {
        display: flex;
        justify-content: flex-end;

        &__btn {
          width: 20px;
          height: 20px;
          color: #11b0c8;
          background: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 2px;

          .material-icons {
            font-size: 15px;
          }

          &:hover {
            cursor: pointer;
            color: #a9b1bd;
          }
        }
      }

      &__textContent {
        margin-top: 20px;

        &__text {
          max-width: 500px;
          text-align: center;
          margin: auto;

          &--less {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 300px;
          }
        }

        &__btnShow {
          width: 50px;
          height: 20px;
          color: #11b0c8;
          background: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 2px;

          &:hover {
            cursor: pointer;
            color: #a9b1bd;
          }

          &--more {
            &:before {
              content: "...more";
            }
          }

          &--less {
            &:before {
              content: "...less";
            }
          }
        }

        &__author {
          display: flex;
          justify-content: flex-end;
          color: #b9c5ce;

          &--hide {
            display: none;
          }
        }
      }
    }
  }
}
</style>
