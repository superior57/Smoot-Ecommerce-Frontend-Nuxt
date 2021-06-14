/* eslint-disable */
import Vue from "vue";
import {
  DICTIONARY
} from "@/constants/constants";

Vue.prototype.$appRouteNavigation = (route) => {
  $nuxt.$router.push(route);
};
Vue.prototype.$hasClassInDOM = (element, classToCheck) => {
  return (` ${element.className} `).indexOf(` ${classToCheck} `) > -1;
};
Vue.prototype.$autoExpandHeightOfTextArea = (nodeId, inputLength, dafaultHeightInPx) => {
  const node =  document.getElementById(nodeId);
  if(inputLength) {
    if(node.scrollHeight > dafaultHeightInPx){
      node.style.height = `${node.scrollHeight + 2}px`;
    }
  } else {
    node.style.height = `40px`;
  }
};
Vue.prototype.$capitalizeEachWord = (value) => {
  if (!value) return "";
  const words = value.toString().toLowerCase();
  return words.replace(/\w\S*/g, function(txt){
    return !DICTIONARY.EXCLUDED_WORDS.FOR_FIRST_LETTER_CAPITALIZE.includes(txt) ?
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() :
      txt.charAt(0).toLowerCase() + txt.charAt(1).toUpperCase() + txt.substr(2).toLowerCase();
  });
};
Vue.prototype.$capitalizeFirstWord = (value) => {
  if (!value) return "";
  value = value.toString().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
};
Vue.prototype.$cleanInput = (value) => {
  if(value.chatAt(0) === "&") {
    value = value.slice(1);
  }
  if(value.chatAt(value.length - 1) === "&") {
    value = value.slice(value.length);
  }
  return value;
};
Vue.prototype.$toFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, JSON.stringify(obj[key]));
  }
  return formData;
};
Vue.prototype.$toFormDataSingle = (value, key) => {
  const formData = new FormData();
  formData.append(key, JSON.stringify(value));
  return formData;
};

Vue.prototype.$toFormDataSingleNoStringify = (value, key) => {
  const formData = new FormData();
  formData.append(key, value);
  return formData;
};

Vue.prototype.$highlightHash = () => {
  const elementHash = window.location.hash.substr(1);
  if (elementHash) {
    const element = document.getElementById(elementHash);
    if (element) {
      element.classList.remove("highlight-end");
      element.classList.add("highlight-start");
      setTimeout(function () {
        element.classList.remove("highlight-start");
        element.classList.add("highlight-end");
        history.pushState("", document.title, this.$nuxt.$route.path);
      }, 800);
    }
  }
};
