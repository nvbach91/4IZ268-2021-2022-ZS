<template>
  <div class="container">
    <div class="page-title">
      <h1 class="page-title__text">
        Případ na přání
      </h1>
    </div>
  </div>
  <div class="podcast-request">
    <div class="container-md">
      <div class="podcast-request__description">
        <p>
          Máte případ, který Vám nedává spát a přejete si o něm slyšet od nás?
        </p>
        <p>
          Vyplňte tento formulář a my si nápad
          přidáme na seznam budoucích dílů a kdo ví, třeba si ho vybereme hned jako díl příští.
        </p>
      </div>

      <Form
        v-slot="{errors}"
        :validationSchema="validationSchema"
        class="podcast-request__form form"
        @submit="onSubmit"
      >
        <div class="form-group">
          <label
            class="label"
            for="name"
          >Jak se případ jmenuje?</label>
          <Field
            id="name"
            name="name"
            class="input"
            type="text"
            :class="{error: errors?.name}"
          />
          <ErrorMessage
            name="name"
            class="form-error"
          />
        </div>
        <div class="form-group">
          <label
            class="label"
            for="reason"
          >Proč je pro Vás případ zajímavý, nebo čím je pro Vás důležitý?</label>
          <Field
            id="reason"
            as="textarea"
            name="reason"
            class="textarea"
            :class="{error: errors?.reason}"
          />
          <ErrorMessage
            name="reason"
            class="form-error"
          />
        </div>
        <div class="form-group">
          <label
            class="label"
            for="source"
          >Kde se o případu psalo/mluvilo?</label>
          <Field
            id="source"
            as="textarea"
            name="source"
            class="textarea"
            :class="{error: errors?.source}"
          />
          <ErrorMessage
            name="source"
            class="form-error"
          />
        </div>
        <div class="form-group">
          <label
            class="label"
            for="feedback"
          >Něco, co s námi chcete sdílet? (Tipy, rady na zlepšení podcastu, co Vám chybí
            apod.)</label>
          <Field
            id="feedback"
            as="textarea"
            name="feedback"
            class="textarea"
            :class="{error: errors?.feedback}"
          />
          <ErrorMessage
            name="feedback"
            class="form-error"
          />
        </div>
        <button class="btn">
          Odeslat
        </button>

        <div
          v-if="sent"
          class="form-sent"
        >
          Děkujeme, Váš návrh byl odeslán!
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ErrorMessage, Field, Form } from "vee-validate";
import { useHeadResolver } from "@/composables/head";
import { object, string } from "yup";

export default defineComponent({
  name: 'RequestPage',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const { updateHead } = useHeadResolver()

    updateHead({
      titlePart: 'Případ na přání',
      meta: { description: 'Napište nám o případ na přání.' }
    })

    const sent = ref(false)

    const validationSchema = object({
      name: string().required(),
      reason: string().required(),
      source: string().required(),
      feedback: string(),
    })

    const onSubmit = (values, { resetForm }) => {
      sent.value = true
      resetForm()
    }

    return {
      validationSchema,
      sent,
      onSubmit,
    }
  }
});
</script>
