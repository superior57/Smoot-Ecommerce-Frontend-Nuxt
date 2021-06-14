<template>
  <b-container class="container-data-and-privacy-form" fluid="sm">
    <h1 class="container-header">Data & privacy settings</h1>
    <b-form>
      <h2 class="section-header">Privacy preferences</h2>
      <div>
        <small tabindex="-1" class="form-text pri-info-text text-muted">
          {{ brand }} may share Information that do not constitute with our
          advertising, and analytics partners. This contributes to
          {{ `${brand}'s` }} business sustainability in the long run, so that we
          can keep our basic features free for all users. Thank you for your
          support.
        </small>
      </div>
      <b-form-checkbox-group
        v-model="formDataAndPrivacy.privacyPreferences"
        :options="dataAndPrivacy.privacyPreferences"
        switches
        stacked
      ></b-form-checkbox-group>
      <h2 class="section-header">Advertising preferences</h2>
      <div>
        <small tabindex="-1" class="form-text pri-info-text text-muted">
          If you turn off the settings below, you'll still see the same number
          of ads, but they may be less relevent to you.
        </small>
      </div>
      <b-form-checkbox-group
        v-model="formDataAndPrivacy.advertisingPreferences"
        :options="dataAndPrivacy.advertisingPreferences"
        switches
        stacked
      ></b-form-checkbox-group>
      <div>
        <small tabindex="-1" class="form-text pri-info-text text-muted">
          {{ brand }} may use your Information to serve you more relevent
          content.
        </small>
      </div>
      <h2 class="section-header">Survey preferences</h2>
      <b-form-checkbox-group
        v-model="formDataAndPrivacy.surveyPreferences"
        :options="dataAndPrivacy.surveyPreferences"
        switches
        stacked
      ></b-form-checkbox-group>
      <b-button type="submit" size="sm" class="mt-3">Save changes</b-button>
    </b-form>
  </b-container>
</template>
<script>
import { BRAND } from "@/constants/constants";
export default {
  name: "DataAndPrivacy",
  data() {
    return {
      brand: BRAND.NAME,
      dataAndPrivacy: {
        privacyPreferences: [
          {
            text: "Interest-based Information",
            value: "interest-based-information",
          },
          {
            text: "Location-based Information",
            value: "location-based-information",
          },
          {
            text: "Demographic Information",
            value: "demographic-information",
          },
        ],
        advertisingPreferences: [
          {
            text: "Interest-based advertising",
            value: "interest-based-advertising",
          },
        ],
        surveyPreferences: [
          {
            text: "Participate in external surveys",
            value: "Participate in external surveys",
          },
        ],
      },
      formDataAndPrivacy: {
        privacyPreferences: [
          "interest-based-information",
          "location-based-information",
          "demographic-information",
        ],
        advertisingPreferences: ["interest-based-advertising"],
        surveyPreferences: [],
      },
    };
  },
};
</script>
