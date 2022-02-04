<template>
  <div class="home">
    <div class="search">
      <searchComponent @searchItems="searchItems" @sortedData="sortedData" />
    </div>

    {{ text }}
    <div class="table">
      <TableContent />
    </div>

    <div class="pagination">
      <PaginationButtons
        :totalPages="totalPages"
        :startBtn="startBtn"
        @showNum="nextPage"
        @nextNumLeft="nextNumLeft"
        @nextNumRight="nextNumRight"
      />
    </div>
  </div>
</template>

<script>
import TableContent from "@/components/TableContent.vue";
import PaginationButtons from "@/components/PaginationButtons.vue";
import searchComponent from "@/components/searchComponent.vue";

import { onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    TableContent,
    PaginationButtons,
    searchComponent,
  },
  setup() {
    onMounted(() => {
      store.dispatch("getData");
    });

    const store = useStore();
    const totalPages = ref(10);
    const startBtn = ref(1);
    const nextPageFromVuex = computed(() => store.state.page);
    const searchValue = ref();

    function nextPage(item) {
      startBtn.value = item;
      store.commit("nextBlockData", item);
    }

    watch(nextPageFromVuex, (num) => {
      if (num) {
        store.dispatch("getData");
      }
    });

    function nextNumLeft(item) {
      startBtn.value = item - 1;

      store.commit("leftNumPagination", item - 1);
    }

    function nextNumRight(item) {
      startBtn.value = item + 1;

      store.commit("rightNumPagination", item + 1);
    }

    function searchItems(item) {
      store.commit("SearchValue", item);
    }

    function sortedData(item) {
      store.commit("sortedData", item);
    }

    return {
      totalPages,
      nextPage,
      store,
      startBtn,
      nextPageFromVuex,
      nextNumLeft,
      nextNumRight,
      searchItems,
      searchValue,
      sortedData,
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  max-width: 1000px;
  margin: auto;
  margin-top: 10px;

  .table {
    margin-top: 30px;
    min-height: 670px;
  }

  .pagination {
    margin-top: 30px;
    margin-bottom: 30px;

    @media (max-width: 425px) {
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
}
</style>
