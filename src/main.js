// polyfills
require('@/libs/requestAnimationFrame')

// google analytics
require('autotrack/lib/plugins/clean-url-tracker')
require('autotrack/lib/plugins/event-tracker')
require('autotrack/lib/plugins/outbound-link-tracker')
require('autotrack/lib/plugins/url-change-tracker')
require('autotrack/lib/plugins/social-widget-tracker')

// dependencies
import Vue from 'vue'
import App from '@/components/App'
import router from '@/core/router'
import mixin from '@/core/mixins'
import i18n from '@/core/i18n'
import store from '@/store'
import { sync } from 'vuex-router-sync'
import * as a11y from '@/libs/a11y'
import { EventBus } from '@/core/bus.js'
import Eventt from 'eventt.js'

// turn production tips off
Vue.config.productionTip = false

// global mixin
Vue.mixin(mixin)

// a11y directives
Vue.directive('a11y', {
    bind: (...args) => { a11y.directive(...args) },
    update: (...args) => { a11y.directive(...args) }
})

// global Event Bus accessible through $bus
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})

// global event listeners manager accessible through $eventt
const eventt = Eventt()
Object.defineProperties(Vue.prototype, {
    $eventt: {
        get: function () {
            return eventt
        }
    }
})

// sync the router with the vuex store
sync(store, router)

// create the Vue instance
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: { App }
})
