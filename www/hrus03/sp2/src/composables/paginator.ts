import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default function usePaginator() {
  const router = useRouter()

  const maxPages = ref(4)
  const totalItems = ref(0)
  const pageSize = ref(10)
  const currentPage = computed((): number => +router.currentRoute.value.query?.page || 1)
  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

  const nav = computed(() => {
    if (!totalItems.value) {
      return []
    }

    let currentMaxPages = maxPages.value
    if (currentPage.value > 1) {
      currentMaxPages -= 1
    }

    const items = []
    const lastPage = Math.min((currentPage.value + currentMaxPages), totalPages.value - 1)

    const startIndex = lastPage - currentMaxPages - 1
    const startPage = startIndex > 0 ? startIndex : 1

    for (let i = startPage; i <= lastPage; i++) {
      items.push(i)
    }

    return items
  })

  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value === totalPages.value)
  const showLastPageSeparator = computed(() => currentPage.value <= totalPages.value - maxPages.value - 1)
  const isActive = (page: number) => page === currentPage.value
  const getPageLink = (page) => ({
    params: router.currentRoute.value.params,
    query: { ...router.currentRoute.value.query, page },
  })
  const changePage = async (page) => {
    await router.replace(getPageLink(page))
  }

  return {
    nav,
    maxPages,
    pageSize,
    totalItems,
    totalPages,
    currentPage,
    isFirstPage,
    isLastPage,
    showLastPageSeparator,
    isActive,
    changePage,
    getPageLink,
  }
}
