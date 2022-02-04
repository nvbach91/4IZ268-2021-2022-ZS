import { HeadObject } from "@vueuse/head";
import { map, merge } from "lodash-es";
import { computed, ref } from "vue";

type Head = {
  title: string
  meta: {[key: string]: string}
}

const head = ref<Head>({
  title: 'Algor Mortis - True crime podcast',
  meta: {
    description: 'True crime podcast hostován Anet a Natálií.',
    keywords: 'Algor Mortis, True crime, podcast',
    author: 'Šimon Hrubý',
    themeColor: '#000',
  }
})

export const useHeadResolver = () => {
  const headObject = computed<HeadObject>((): HeadObject => ({
    title: head.value.title,
    meta: map(head.value.meta, (content, name) => ({ content, name }))
  }))

  const updateHead = (value: Partial<Head> & {titlePart?: string}) => {
    if (value.titlePart) {
      value.title = `${value.titlePart} | Algor Mortis`
      delete value.titlePart
    }
    head.value = merge(head.value, value)
  }

  return {
    updateHead,
    headObject,
  }
}
