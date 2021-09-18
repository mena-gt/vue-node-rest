<template>
    <form class="uk-form-stacked" @submit="onSubmit">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Key</label>
            <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="text" placeholder="" v-model="form.fields.key" required>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">shared_secret</label>
            <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="text" placeholder="" v-model="form.fields.shared_secret" required>
            </div>
        </div>
        <div class="uk-margin">
            <button class="uk-button uk-button-primary">Submit</button>
            <a class="uk-button uk-button-default uk-margin-small-left" @click="onClick">Clean</a>
        </div>
    </form>
    <div>
        <div class="uk-background-muted uk-padding-small uk-panel">
            <p class="uk-h4">Response:</p>
            <code>{{response}}</code>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


let api  = {
    putCredential: function (url, formData) {
        return new Promise ((resolve, reject) => {
            axios.put (url, formData)
                .then (data => {
                    if (204 == data.status) {
                        return {
                            success: true,
                            message: '204 No Content'
                        };
                    }

                    return data.data;
                })
                .then (response => {
                    return (response.success) ? 
                        resolve (response) : reject (response);
                })
                .catch (err =>  reject (err));
        });
    }
};

export default {
  name: 'OCredentialArea',
  components: {},
  data () {
      return {
          form: {
              url: '/credential',
              fields: {
                  key: '',
                  shared_secret: ''
              }
          },
          response: ''
      };
  },
  methods: {
      reset () {
          this.form.fields.key = '';
          this.form.fields.shared_secret = '';
          this.response = '';
      },
      sendData () {
          api.putCredential (this.form.url, this.form.fields)
            .then (response => {
                this.response = response.message;
            })
            .catch (err => {
                this.response = err.message;
            });
      },
      onClick () {
          this.reset ();
      },
      onSubmit (e) {
          e.preventDefault ();
          this.sendData ();
      }
  }
}
</script>
