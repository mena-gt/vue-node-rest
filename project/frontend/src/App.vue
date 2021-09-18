<template>
    <t-base>
      <ul uk-accordion>
          <li>
              <a class="uk-accordion-title" href="#">
                <span class="uk-label-warning"> PUT </span> /credential
              </a>
              <div class="uk-accordion-content uk-padding-large uk-padding-remove-top">
                <o-credential-area />
              </div>
          </li>
          <li>
              <a class="uk-accordion-title" href="#">
                <span class="uk-label-success"> POST </span> /message
              </a>
              <div class="uk-accordion-content uk-padding-large uk-padding-remove-top">
                <o-new-msg-area />
              </div>
          </li>
          <li>
              <a class="uk-accordion-title" href="#">
                <span class="uk-label"> GET </span> /message/:id
              </a>
              <div class="uk-accordion-content uk-padding-large uk-padding-remove-top">
                <o-id-msg-area />
              </div>
          </li>
          <li>
              <a class="uk-accordion-title" href="#">
                <span class="uk-label"> GET </span> /messages/:tag
              </a>
              <div class="uk-accordion-content uk-padding-large uk-padding-remove-top">
                <o-tag-msg-area />
              </div>
          </li>
      </ul>
    </t-base>
</template>

<script>
import OCredentialArea from './components/OCredentialArea.vue';
import ONewMsgArea from './components/ONewMsgArea.vue';
import OIdMsgArea from './components/OIdMsgArea.vue';
import OTagMsgArea from './components/OTagMsgArea.vue';
import TBase from './components/TBase.vue';


export default {
  name: 'App',
  components: {
      OCredentialArea,
      OIdMsgArea,
      ONewMsgArea,
      OTagMsgArea,
      TBase
  }
}
</script>

<style>
@import url('./assets/uikit/css/3.5.10.css');
</style>
