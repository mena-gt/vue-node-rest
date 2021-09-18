<template>
    <form class="uk-form-stacked" @submit="onSubmit">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">X-Key</label>
            <div class="uk-form-controls">
                <input class="uk-input" 
                      id="form-stacked-text" 
                       type="text" 
                       placeholder="" 
                       v-model="xKey" 
                       required>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">message</label>
            <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="text" 
                       placeholder="" v-model="form.fields.msg" required>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">tags</label>
            <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="text" 
                       placeholder="" v-model="form.fields.tags" required>
                <p class="uk-text-small uk-margin-remove-top">Note: The tags must be separated by a colon.</p>
            </div>
        </div>
        <div class="uk-margin">
            <button class="uk-button uk-button-primary">Submit</button>
            <a class="uk-button uk-button-default uk-margin-small-left" @click="onClick">Clean</a>
        </div>
    </form>
    <div class="uk-background-muted uk-padding-small uk-panel">
        <p class="uk-h4">Response:</p>
        <code>{{response}}</code>
        <div class="uk-text-default">
            {{resData}}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

let config = () => {
    return {
        validateStatus: function (status) {
            return status >= 200 && status < 500
        }
    };
};

let api  = {
    postData: function (url, data, headers) {
        return new Promise ((resolve, reject) => { 
            axios.post (url, data, headers, config ())
                .then (res => res.data)
                .then (response => {
                    return (response.success) ? 
                        resolve (response) : reject (response);
                })
                .catch (err => reject (err.response));
        });
    }
};

export default {
  name: 'ONewMsgArea',
  components: {},
  data () {
      return {
          xKey: '',
          form: {
              url: '/message',
              fields: {
                  msg: '',
                  tags: ''
              }
          },
          authn: {
              url: '/authorize'
          },
          response: '',
          resData: ''
      };
  },
  methods: {
      reset () {
          this.form.fields.msg = '';
          this.form.fields.tags = '';
          this.xKey = '';
          this.response = '';
          this.resData = '';
      },
      generateHeaders () {
          return {
              headers: {
                'X-Key': this.xKey,
                'X-Route': this.form.url
              }
          };
      },
      getAuthorizedHeaders () {
          return new Promise ((resolve, reject) => {
            let headers = this.generateHeaders ();
            api.postData (this.authn.url, this.form.fields, headers)
                .then ((response) => {
                    headers.headers['X-Signature'] = response.data['x-signature'];
                    resolve (headers);
                })
                .catch (err => {
                    reject (err);
                });
          });
      },
      sendAuthorizedData (headers) {
          return new Promise ((resolve, reject) => {
            api.postData (this.form.url, this.form.fields, headers)
                .then (response => {
                    resolve (response);
                })
                .catch (err => {
                    reject (err);
                });
          });
      },
      async sendData () {
          try {
              const authorizedHeaders = await this.getAuthorizedHeaders ();
              const res = await this.sendAuthorizedData (authorizedHeaders);
              this.response = res.message;
              this.resData = JSON.stringify(res.data);
          } catch (err) {
              this.response = err.data.message;
          }
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