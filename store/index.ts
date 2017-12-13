import * as generator from './modules/generator';
import * as serviceworker from './modules/serviceworker';
import * as i18n from './modules/i18n';
import { ActionTree } from 'vuex';

// More info about store: https://vuex.vuejs.org/en/core-concepts.html
// Structure of the store:
    // Types: Types that represent the keys of the mutations to commit
    // State: The information of our app, we can get or update it.
    // Getters: Get complex information from state
    // Action: Sync or async operations that commit mutations
    // Mutations: Modify the state

export const modules = {
    [generator.name]: generator,
    [serviceworker.name]: serviceworker,
    [i18n.name]: i18n
};

export type RootState = typeof modules;

// Call to nuxtServerInit of all the modules
export const actions: ActionTree<{}, RootState> = {
    async nuxtServerInit({ dispatch }) {
        for (const key in modules) {
            if (modules[key].actions && modules[key].actions.nuxtServerInit) {
                dispatch(`${key}/nuxtServerInit`);
            }
        }
    },
};