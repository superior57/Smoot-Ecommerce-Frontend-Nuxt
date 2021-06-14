<template>
  <b-container class="container-messages" rounded fluid="xl">
    <b-container>
      <b-row>
        <b-col xl="4" lg="5" md="12" sm="12" cols="12" class="col-left">
          <div class="inbox-type">
            <div v-if="!showMoreInboxOptions" class="label">
              <h1 class="cursor-pointer" @click="toggleInboxList()">
                <span>
                  <i class="fa fa-archive" aria-hidden="true"></i>
                </span>
                <span>
                  {{ selectedInboxType }}
                </span>
                <span>
                  <i
                    class="fa fa-angle-down"
                    :class="showListInboxTypes ? `fa-rotate-180` : null"
                    aria-hidden="true"
                  ></i>
                </span>
              </h1>
              <div
                v-if="archivedList.length"
                class="more cursor-pointer"
                @click="makeShowMoreInboxOptionsVisible()"
              >
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
              </div>
              <div
                v-if="showListInboxTypes"
                class="list rounded text-align-center"
              >
                <!-- eslint-disable -->
                <div
                  v-for="(inboxType, inboxTypeIndex) in inboxTypes"
                  :key="inboxTypeIndex"
                  class="cursor-pointer"
                  :class="inboxType.value === `archived` ? `inbox-type-list-active` : null"
                  @click="toggleInboxList(), $nuxt.$router.push(`/messages/${inboxType.value}`)"
                >
                  <span>
                    <i
                      :class="inboxType.value === `inbox` ? `fa fa-inbox` : `fa fa-archive`"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span>
                    {{ inboxType.text }}
                  </span>
                </div>
                <!-- eslint-enable -->
              </div>
            </div>
            <div v-else class="label mb-2">
              <div class="selected-count">
                {{ `${selectedInboxList.length} selected` }}
              </div>
              <div class="select-options">
                <b-button
                  class="btn-select"
                  size="sm"
                  @click="selectAllMessagesInInboxView()"
                >
                  <i
                    v-if="selectedInboxList.length === archivedList.length"
                    class="fa fa-check-square"
                    aria-hidden="true"
                  ></i>
                  <i v-else class="fa fa-minus-square" aria-hidden="true"></i>
                </b-button>
                <b-button
                  class="btn-delete"
                  size="sm"
                  variant="danger"
                  :disabled="!selectedInboxList.length ? true : false"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </b-button>
                <b-button
                  class="btn-close default-btn-outline"
                  size="sm"
                  @click="closeInboxSelection()"
                >
                  <i class="fa fa-times" aria-hidden="true"></i>
                </b-button>
              </div>
            </div>
          </div>
          <div class="inbox">
            <div v-if="!archivedList.length" class="empty-list">
              <div>
                <i class="fa fa-archive fa-3x" aria-hidden="true"></i>
              </div>
              <p>Your archived list is empty.</p>
            </div>
            <div
              v-for="(message, messageIndex) in archivedList"
              v-else
              :id="`area-${messageIndex}`"
              :key="messageIndex"
              class="area cursor-pointer area-hover"
            >
              <!-- select option for each message -->
              <b-form-checkbox
                v-if="showMoreInboxOptions"
                :id="`checkbox-${messageIndex}`"
                v-model="selectedInboxList"
                :value="messageIndex"
                @change="highlightSelectedMessageInInboxView(messageIndex)"
              ></b-form-checkbox>
              <!-- end select option for each message -->
              <div class="message-list-view-user-avatar text-align-left">
                <b-img
                  :src="`${message.user_avatar}?${fileProperties.user.avatarForInbox}`"
                  class="inbox-user-avatar"
                  rounded="circle"
                ></b-img>
              </div>
              <div class="message-list-view-body">
                <div class="username-and-date-time">
                  <div
                    v-if="!showMoreInboxOptions"
                    class="username text-truncate"
                  >
                    {{ message.username | truncate("21", "...") }}
                  </div>
                  <div v-else class="username text-truncate">
                    {{ message.username | truncate("17", "...") }}
                  </div>
                  <div class="date-time">
                    {{ message.created_at }}
                  </div>
                </div>
                <div class="subject-last-chat-and-product-image">
                  <div>
                    <div
                      v-if="!showMoreInboxOptions"
                      class="subject text-truncate"
                    >
                      {{ message.subject | truncate("21", "...") }}
                    </div>
                    <div v-else class="subject text-truncate">
                      {{ message.subject | truncate("17", "...") }}
                    </div>
                    <div
                      v-if="!showMoreInboxOptions"
                      class="last-chat text-truncate"
                    >
                      {{ message.last_chat | truncate("21", "...") }}
                    </div>
                    <div v-else class="last-chat text-truncate">
                      {{ message.last_chat | truncate("17", "...") }}
                    </div>
                  </div>
                  <div>
                    <img
                      :src="`${message.product_image}?${fileProperties.product.inbox}`"
                      class="inbox-product-image rounded"
                    />
                    <span
                      v-if="message.product_status !== `available`"
                      class="product-status text-align-center text-uppercase"
                    >
                      {{ message.product_status }}
                    </span>
                  </div>
                </div>
                <div v-if="message.is_product_offered" class="accepted-offer">
                  <span class="offer-label text-uppercase">Accepted</span>
                  <!-- eslint-disable -->
                  <span class="text-truncate">
                    {{ `Offered you ${message.offered_price}` | truncate("25", "...") }}
                  </span>
                  <!-- eslint-enable -->
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col
          xl="8"
          lg="7"
          md="12"
          sm="12"
          cols="12"
          class="col-right"
        ></b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import {
  INBOX,
  FILE_PATHS,
  FILE_QUERY_PARAMETERS,
} from "@/constants/constants";
export default {
  name: "Messages",
  data() {
    return {
      inboxTypes: INBOX.TYPES,
      selectedInboxType: "Archived",
      showListInboxTypes: false,
      showMoreInboxOptions: false,
      archivedList: [
        {
          id: `46464744`,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/no-a.png`,
          username: `jostann`,
          created_at: `31/08`,
          subject: `Samsung Monitor 22`,
          last_chat: `Is this an original one?`,
          product_image: `${FILE_PATHS.PRODUCT}/sssss45dfd.jpg`,
          product_status: `Sold`,
          is_product_offered: true,
          offered_price: `Rs. 1200`,
        },
        {
          id: `46546744`,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p2.webp`,
          username: `citrimobilesg`,
          created_at: `20/08`,
          subject: `Screen Repair Xender XRozel XS Maximizing Samsung LCD Display Screen Repair`,
          last_chat: `Ok sure, see you in the evenig.`,
          product_image: `${FILE_PATHS.PRODUCT}/hdhhcchcc.jpg`,
          product_status: `available`,
          is_product_offered: false,
          offered_price: null,
        },
        {
          id: `46464112`,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p4.webp`,
          username: `balamurugan1312eeeeeeeeeeeeeeeeeeeeee`,
          created_at: `12/12/2019`,
          subject: `iPhone with Cable`,
          last_chat: `Is this still available`,
          product_image: `${FILE_PATHS.PRODUCT}/20200119238815794276795-1.jpg`,
          product_status: `Sold`,
          is_product_offered: true,
          offered_price: `Rs. 22,50044444488`,
        },
      ],
      // archivedList: [],
      selectedInboxList: [],
      fileProperties: {
        product: {
          inbox: FILE_QUERY_PARAMETERS.PRODUCT.INBOX,
        },
        user: {
          avatarForInbox: FILE_QUERY_PARAMETERS.USER.AVATAR_FOR_INBOX,
        },
      },
    };
  },
  watch: {},
  created() {
    /* eslint-disable */
    this.inboxTypes.filter(function(inboxType) {
      if(inboxType.value === this.$nuxt.$route.params.type) {
        this.selectedInboxType = inboxType.text;
        return;
      }
    }.bind(this));
    /* eslint-enable */
  },
  methods: {
    toggleInboxList() {
      this.showListInboxTypes = !this.showListInboxTypes;
    },
    makeShowMoreInboxOptionsVisible() {
      if (this.showListInboxTypes) {
        this.showListInboxTypes = false;
      }
      this.showMoreInboxOptions = true;
    },
    closeInboxSelection() {
      this.unHighlightSelectedMessageInInboxView();
      this.selectedInboxList = [];
      this.showMoreInboxOptions = false;
    },
    selectAllMessagesInInboxView() {
      this.selectedInboxList = [];
      /* eslint-disable */
      this.archivedList.filter(function(m, i) {
        this.selectedInboxList.push(i);
      }.bind(this));
      /* eslint-enable */
      this.highlightSelectedMessageInInboxView();
    },
    highlightSelectedMessageInInboxView(idForElement = null) {
      if (idForElement === null) {
        /* eslint-disable */
        this.selectedInboxList.filter(function(selectedMessage) {
          const selectedMessageElement = document.getElementById(`area-${selectedMessage}`);
          selectedMessageElement.classList.add("area-mark");
          selectedMessageElement.classList.remove("area-hover");
        });
        /* eslint-enable */
      } else {
        /* eslint-disable */
        const selectedMessageElement = document.getElementById(`area-${idForElement}`);
        /* eslint-enable */
        if (!this.$hasClassInDOM(selectedMessageElement, "area-mark")) {
          selectedMessageElement.classList.add("area-mark");
          selectedMessageElement.classList.remove("area-hover");
        } else {
          selectedMessageElement.classList.remove("area-mark");
          selectedMessageElement.classList.add("area-hover");
        }
      }
    },
    unHighlightSelectedMessageInInboxView() {
      /* eslint-disable */
      this.selectedInboxList.filter(function(selectedMessage) {
        const selectedMessageElement = document.getElementById(`area-${selectedMessage}`);
        selectedMessageElement.classList.remove("area-mark");
        selectedMessageElement.classList.add("area-hover");
      });
      /* eslint-enable */
    },
  },
};
</script>
