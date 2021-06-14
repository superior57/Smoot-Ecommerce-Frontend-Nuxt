<template>
  <b-container
    class="container-messages main-container-for-hidden-public-header"
    rounded
    fluid="xl"
  >
    <b-alert
      :show="alert.dismissCountDown"
      class="alert-absolute"
      variant="success"
      fade
      dismissible
      @dismiss-count-down="countDownChanged"
    >
      {{ alert.content }}
    </b-alert>
    <b-container class="container-inner-messages">
      <b-row>
        <b-col
          xl="4"
          lg="5"
          md="12"
          sm="12"
          cols="12"
          class="col-left"
          :class="!isOpenedAMessage ? null : `c-h-o-m`"
        >
          <div class="child-contaner-inbox">
            <div class="mt-2 mb-2">
              <inline-navigation></inline-navigation>
            </div>
            <div class="inbox-type disable-user-select">
              <div v-if="!showMoreInboxOptions" class="label">
                <h1 class="cursor-pointer" @click="toggleInboxList()">
                  <span>
                    <i class="fa fa-inbox" aria-hidden="true"></i>
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
                  v-if="inboxList.length"
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
                    :class="inboxType.value === `inbox` ? `inbox-type-list-active` : null"
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
                      v-if="selectedInboxList.length === inboxList.length"
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
                    class="btn-archive"
                    size="sm"
                    variant="dark"
                    :disabled="!selectedInboxList.length ? true : false"
                  >
                    <i class="fa fa-archive" aria-hidden="true"></i>
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
              <div v-if="!inboxList.length" class="empty-list">
                <div>
                  <i class="fa fa-inbox fa-3x" aria-hidden="true"></i>
                </div>
                <p>Your Inbox is empty.</p>
              </div>
              <div
                v-for="(message, messageIndex) in inboxList"
                v-else
                :id="`area-${messageIndex}`"
                :key="messageIndex"
                class="area cursor-pointer area-hover disable-user-select"
                @click="fetchConversation(messageIndex.id)"
              >
                <!-- eslint-disable -->
                <!-- select option for each message -->
                <div @click="$event.stopPropagation()">
                  <b-form-checkbox
                    v-if="showMoreInboxOptions"
                    :id="`checkbox-${messageIndex}`"
                    v-model="selectedInboxList"
                    :value="messageIndex"
                    @change="highlightSelectedMessageInInboxView(messageIndex)"
                  ></b-form-checkbox>
                </div>
                <!-- end select option for each message -->
                <!-- eslint-enable -->
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
                  <div
                    v-if="message.is_made_an_offer && message.is_offer_accepted"
                    class="accepted-offer"
                  >
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
          </div>
        </b-col>
        <!-- eslint-disable -->
        <b-col
          xl="8"
          lg="7"
          md="12"
          sm="12"
          cols="12"
          class="col-right"
          :class="!isOpenedAMessage ? `c-h-o-m` : null"
        >
        <div v-if="!isOpenedAMessage" class="default-text-chat-window">
          <div class="text-align-center">
            <p>
              You don't have a message selected
            </p>
            <p class="text-secondary">To open a message, select one from the Inbox</p>
          </div>
        </div>
        <div v-else>
          <div v-if="!Object.keys(selectedMessageConversationDetails).length || !selectedMessageConversations.length">
            Loading...
          </div>
          <div v-else class="child-contaner-message">
            <div class="message-view-header pb-2">
              <inline-navigation
                navigate-from="chat"
                navigation-label="Inbox"
                @state="closeChat"
              ></inline-navigation>
              <div class="left-join">
                <div class="recipient-avatar text-align-left">
                  <b-img
                    :src="`${selectedMessageConversationDetails.avatar}?${fileProperties.user.avatarForInbox}`"
                    class="inbox-user-avatar"
                    rounded="circle"
                  ></b-img>
                </div>
                <div class="recipient-body">
                  <div class="username">
                    {{ selectedMessageConversationDetails.username }}
                  </div>
                  <div class="last-seen text-secondary">
                    {{ `Last seen ${selectedMessageConversationDetails.last_online}` }}
                  </div>
                </div>
              </div>
              <div
                class="recipient-more cursor-pointer disable-user-select"
                @click="toggleMoreChatOptions = !toggleMoreChatOptions"
              >
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                <div
                  v-if="toggleMoreChatOptions"
                  class="option-list rounded"
                >
                  <div
                    v-for="(chatOption, chatOptionIndex) in chatOptions"
                    :key="chatOptionIndex"
                    class="options text-truncate"
                    @click="chatOptionToRun(chatOption.value)"
                  >
                    {{ listChatOptions(chatOption.value, chatOption.text, selectedMessageConversationDetails.username) | truncate("15", "...")}}
                  </div>
                </div>
              </div>
            </div>
            <div class="message-view-sub-header pt-2 pb-2">
              <div class="section-1">
                <div class="left-join">
                  <div class="product-photo text-align-left">
                    <img
                      :src="`${selectedMessageConversationDetails.product_image}?${fileProperties.product.inbox}`"
                      class="inbox-product-image rounded"
                    />
                    <span
                      v-if="selectedMessageConversationDetails.product_status !== `available`"
                      class="product-status text-align-center text-uppercase"
                    >
                      {{ selectedMessageConversationDetails.product_status }}
                    </span>
                  </div>
                  <div class="product-body">
                    <div class="title text-truncate">
                      {{ selectedMessageConversationDetails.product_title | truncate("23", "...") }}
                    </div>
                    <div class="price">
                      {{ selectedMessageConversationDetails.product_price }}
                    </div>
                  </div>
                </div>
                <div class="product-offer">
                  <div
                    v-if="selectedMessageConversationDetails.is_made_an_offer && selectedMessageConversationDetails.is_offer_accepted && !selectedMessageConversationDetails.is_left_a_review"
                    class="review-container"
                  >
                    <b-button
                        size="sm"
                        class="default-btn-outline"
                        @click="showReviewModal"
                    >
                      Leave a review
                    </b-button>
                    <div
                      v-if="modals.isOpenReviewModal"
                      class="modal-for-backdrop"
                      >
                      <div class="modal-box rounded p-4">
                        <div class="header pb-3">
                          <div class="text">
                            <h2>
                              Rate the experience
                            </h2>
                            <span class="text-secondary">
                              The other party can only read your review after they’ve also left you one.
                            </span>
                          </div>
                          <b-icon
                            icon="x"
                            aria-hidden="true"
                            class="btn-close cursor-pointer"
                            @click="hideReviewModal"  
                          ></b-icon>
                        </div>
                        <div
                          class="body mt-2 pb-2 pt-2"
                          v-for="(question, questionIndex) in reviewFormLookUpValues.questions"
                          :key="questionIndex"
                        >
                          <div class="left-col question">
                            <h3>{{ question.title }}</h3>
                            <span class="question-description text-secondary">
                              {{ question.description }}
                            </span>
                          </div>
                          <div class="col-right container-feedback-stars">
                            <b-form-rating
                              v-model="reviewForm.starsForQuestions[questionIndex].stars"
                              color="#ff8800"
                              no-border
                              size="lg"
                            ></b-form-rating>
                          </div>
                        </div>
                        <div class="body mt-2 pb-2 pt-2">
                          <div v-if="selectedMessageConversationDetails.listed_by === loggedUser">
                            <h3>Please write a review for the buyer</h3>
                            <b-form-textarea
                              class="review-input"
                              :placeholder="`What went well? Write something to appreciate the buyer`"
                              v-model="reviewForm.review"
                              :maxlength="reviewFormLookUpValues.reviewMaxLength"
                              rows="3"
                              size="sm"
                              no-resize
                            ></b-form-textarea>
                          </div>
                          <div v-else>
                            <h3>Please write a review for the seller</h3>
                            <b-form-textarea
                              class="review-input"
                              :placeholder="`What went well? Write something to appreciate the seller`"
                              v-model="reviewForm.review"
                              :max-length="reviewFormLookUpValues.reviewMaxLength"
                              rows="3"
                              size="sm"
                              no-resize
                            ></b-form-textarea>
                          </div>
                          <div class="font-size-85 text-secondary mt-1">
                            {{ `${reviewForm.review.length}/${reviewFormLookUpValues.reviewMaxLength}` }}
                          </div>
                        </div>
                        <div class="footer">
                          <div class="font-size-85 text-secondary mr-2">
                            Note: You will not be able to edit your review once it is submitted.
                          </div>
                          <div class="btn-wrapper">
                            <b-button pill size="sm">Submit review</b-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="selectedMessageConversationDetails.listed_by === loggedUser"
                  >
                    <div v-if="!selectedMessageConversationDetails.is_made_an_offer">
                      Waiting for offer
                    </div>
                  </div>
                  <div
                    v-else
                  >
                    <div v-if="!selectedMessageConversationDetails.is_made_an_offer">
                      <b-button
                        v-if="!isMakeOfferButtonClicked"
                        size="sm"
                        @click="isMakeOfferButtonClicked = true"
                      >
                        Make offer
                      </b-button>
                    </div>
                    <div v-else>
                      <div class="container-offer-details">
                        <b-button
                          v-if="!selectedMessageConversationDetails.is_offer_accepted"
                          size="sm"
                          v-b-modal.modal-offer-details
                        >
                          Your offer&nbsp;<i class="fa fa-info-circle" aria-hidden="true"></i>
                        </b-button>
                        <b-modal b-modal id="modal-offer-details" centered hide-header hide-footer size="sm">
                          <div class="text-align-center mb-3">
                            {{ `You've offered ${currency}. ${offerField}` }}
                          </div>
                          <div>
                            <b-button block pill size="sm" variant="outline-danger" @click="cancelOffer">
                              Cancel offer
                            </b-button>
                            <b-button block pill size="sm" @click="$bvModal.hide(`modal-offer-details`)">
                              Close
                            </b-button>
                          </div>
                        </b-modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="isMakeOfferButtonClicked"
                class="section-2"
              >
                <b-input-group
                  class="group-input-offer"
                  size="sm"
                  :prepend="`${currency}.`"
                  append=".00" 
                >
                  <b-form-input v-model="offerField"></b-form-input>
                </b-input-group>
                <b-button
                    class="ml-2"
                    size="sm"
                    @click="makeOffer"
                >
                  Make offer
                </b-button>
                <b-button
                  class="default-btn-outline ml-2"
                  size="sm"
                  @click="isMakeOfferButtonClicked = false"
                >
                  Cancel
                </b-button>
              </div>
            </div>
            <div ref="messageView" class="message-view-conversations">
              <div
                v-for="(message, messageIndex) in selectedMessageConversations"
                :key="messageIndex"
                :class="message.sent_by === `me` ? `con-parent-m text-align-right` : `con-parent-o text-align-left`"
                class="con-parant">
                <div
                  :class="appendClass(message.sent_by, message.contains_image)"
                  class="con-child text-align-center"
                >
                    <div
                      v-if="!message.contains_image"
                      class="message"
                      :class="addAlignClass(message.message.length)"
                    >
                      {{message.message}}
                    </div>
                    <div v-else>
                      <b-img
                        v-if="!message.is_blob"
                        class="photo"
                        :src="`${message.image}?${fileProperties.message.sentFiles.photo}`"
                      ></b-img>
                      <b-img
                        v-else
                        class="photo"
                        :src="message.image"
                      ></b-img>
                    </div>
                </div>
                <span class="time-print text-secondary">
                  {{message.created_at}}
                </span>
              </div>
            </div>
            <div class="message-view-message-input mt-2">
              <b-form @submit.prevent="sendMessage()">
                <div>
                  <b-form-textarea
                    id="message-input"
                    placeholder="Type here..."
                    class="message-input"
                    v-model="messageSendForm.message"
                    @input="$autoExpandHeightOfTextArea(`message-input`, messageSendForm.message.length, `40`)"
                    @keyup.enter="sendMessage()"
                  ></b-form-textarea>
                </div>
                <div>
                  <div v-if="!messageSendForm.message.length" class="image-upload-container cursor-pointer">
                    <b-button class="default-btn-outline">
                      <i class="fa fa-file-image-o" aria-hidden="true"></i>
                    </b-button>
                    <input
                      type="file"
                      class="cursor-pointer default-file-upload-field"
                      accept="image/jpeg, image/png"
                      @change="sendImage"
                    />
                  </div>
                  <b-button
                    v-else
                    type="submit"
                  >
                    Send
                  </b-button>
                </div>
              </b-form>
            </div>
          </div>
        </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import {
  INBOX,
  FILE_PATHS,
  FILE_QUERY_PARAMETERS,
  CURRENCY,
} from "@/constants/constants";
export default {
  name: "Messages",
  data() {
    return {
      inboxTypes: INBOX.TYPES,
      chatOptions: INBOX.CHAT_OPTIONS,
      selectedInboxType: "Inbox",
      showListInboxTypes: false,
      showMoreInboxOptions: false,
      isOpenedAMessage: false,
      toggleMoreChatOptions: false,
      isMakeOfferButtonClicked: false,
      currency: CURRENCY,
      inboxList: [
        {
          id: `46464744`,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
          username: `jostann`,
          created_at: `31/08`,
          subject: `Samsung Monitor 22`,
          last_chat: `Is this an original one?`,
          product_image: `${FILE_PATHS.PRODUCT}/sssss45dfd.jpg`,
          product_status: `sold`,
          is_made_an_offer: true,
          is_offer_accepted: true,
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
          is_made_an_offer: false,
        },
        {
          id: `46464112`,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p4.webp`,
          username: `balamurugan`,
          created_at: `12/12/2019`,
          subject: `iPhone with Cable`,
          last_chat: `Is this still available`,
          product_image: `${FILE_PATHS.PRODUCT}/20200119238815794276795-1.jpg`,
          product_status: `sold`,
          is_made_an_offer: true,
          is_offer_accepted: true,
          offered_price: `Rs. 22,500`,
        },
      ],
      selectedInboxList: [],
      selectedMessageConversationDetails: {
        username: `jostann`,
        last_online: `2 minuts ago`,
        avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
        product_title: `Samsung Monitor 22`,
        product_image: `${FILE_PATHS.PRODUCT}/sssss45dfd.jpg`,
        product_status: `sold`,
        is_made_an_offer: true,
        is_offer_accepted: true,
        is_left_a_review: false,
        product_price: `Rs: 1500`,
        listed_by: `hudhahtcss`,
      },
      selectedMessageConversations: [
        {
          message: "Is this still available?",
          sent_by: "recipient",
          contains_image: false,
          created_at: "5 minuts ago",
        },
        {
          message: "Yes",
          sent_by: "me",
          contains_image: false,
          created_at: "5 minuts ago",
        },
        {
          message: "Cool!, I have checked it.",
          sent_by: "recipient",
          contains_image: false,
          created_at: "4 minuts ago",
        },
        {
          message: "I am on my way to get it",
          sent_by: "recipient",
          contains_image: false,
          created_at: "4 minuts ago",
        },
        {
          message: "Okay, See you at the lobby in the condo",
          sent_by: "me",
          contains_image: false,
          created_at: "4 minuts ago",
        },
        {
          message: "Cool!, I have checked it.",
          sent_by: "recipient",
          contains_image: false,
          created_at: "4 minuts ago",
        },
        {
          message: "Cool!, I have checked it.",
          sent_by: "recipient",
          contains_image: false,
          created_at: "4 minuts ago",
        },
        {
          message: "Cool!, I have checked it.",
          sent_by: "recipient",
          contains_image: false,
          created_at: "4 minuts ago",
        },
        {
          message: "Cool!, I have checked it.",
          sent_by: "recipient",
          contains_image: false,
          created_at: "4 minuts ago",
        },
        {
          image: `${FILE_PATHS.MESSAGE_SENT_FILE.PHOTO}/mess-dummy.jpg`,
          sent_by: "recipient",
          contains_image: true,
          is_blob: false,
          created_at: "4 minuts ago",
        },
      ],
      loggedUser: "hudhahtc",
      messageSendForm: {
        message: "",
      },
      offerField: 0,
      fileProperties: {
        product: {
          inbox: FILE_QUERY_PARAMETERS.PRODUCT.INBOX,
        },
        user: {
          avatarForInbox: FILE_QUERY_PARAMETERS.USER.AVATAR_FOR_INBOX,
        },
        message: {
          sentFiles: {
            photo: FILE_QUERY_PARAMETERS.MESSAGE_SENT_FILE.PHOTO,
          },
        },
      },
      modals: {
        isOpenReviewModal: false,
      },
      alert: {
        content: "",
        dismissSecs: 5,
        dismissCountDown: 0,
      },
      reviewForm: {
        review: "",
        starsForQuestions: [],
      },
      reviewFormLookUpValues: {
        questions: [
          {
            id: `01`,
            title: `Meetup / Shipping`,
            description: `The coordination was smooth. Seller was punctual to the meetup, or shipping was on time.`,
          },
          {
            id: `02`,
            title: `Item as Described`,
            description: `The actual item matched exactly with the listing description and photos.`,
          },
          {
            id: `03`,
            title: `Communication`,
            description: `Seller was polite and friendly, and the overall chat experience was pleasant.`,
          },
        ],
        reviewMaxLength: 400,
      },
    };
  },
  watch: {
    "selectedMessageConversations.length"() {
      this.$nextTick(() => this.scrollToEnd());
    },
    isOpenedAMessage() {
      if (this.isOpenedAMessage) {
        this.$nextTick(() => this.scrollToEnd());
      }
    },
    "alert.dismissCountDown"() {
      if (!this.alert.dismissCountDown) {
        this.alert.content = "";
      }
    },
  },
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
  mounted() {
    /* eslint-disable */
    this.reviewFormLookUpValues.questions.filter(function (question) {
      this.reviewForm.starsForQuestions.push({
        questionId: question.id,
        stars: 0,
      });
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
      this.inboxList.filter(function(m, i) {
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
    fetchConversation(messageId) {
      this.isOpenedAMessage = true;
    },
    appendClass(sentBy, containsImage) {
      let classToAppend = "";
      if (sentBy === "me") {
        classToAppend = "con-m";
      } else {
        classToAppend = "con-o";
      }
      if (containsImage) {
        classToAppend += " con-child-for-image";
      }
      return classToAppend;
    },
    sendMessage() {
      this.selectedMessageConversations.push({
        message: this.messageSendForm.message,
        sent_by: "me",
        contains_image: false,
        created_at: "Just now",
      });
      this.messageSendForm.message = "";
      this.$autoExpandHeightOfTextArea(
        `message-input`,
        this.messageSendForm.message.length,
        `40`
      );
    },
    scrollToEnd() {
      // const container = this.$el.querySelector("#message-view");
      const messageDisplay = this.$refs.messageView;
      // messageDisplay.scrollTop = messageDisplay.lastElementChild.offsetTop;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    },
    addAlignClass(messageLength) {
      let className = "";
      if (messageLength <= 6) {
        className = "text-align-center";
      } else {
        className = "text-align-left";
      }
      return className;
    },
    sendImage(event) {
      if (typeof event.target.files[0] !== "undefined") {
        this.selectedMessageConversations.push({
          image: window.URL.createObjectURL(event.target.files[0]),
          sent_by: "me",
          contains_image: true,
          is_blob: true,
          created_at: "Just now",
        });
      }
    },
    closeChat(state) {
      this.isOpenedAMessage = false;
    },
    listChatOptions(chatValue, chatText, username) {
      if (chatValue === "block" || chatValue === "report") {
        return `${chatText} @${username}`;
      }
      return chatText;
    },
    makeOffer() {
      this.isMakeOfferButtonClicked = false;
      this.selectedMessageConversations.push({
        message: `Made the offer ${this.currency}. ${this.offerField}`,
        sent_by: "me",
        contains_image: false,
        created_at: "Just now",
      });
      this.selectedMessageConversationDetails.is_made_an_offer = true;
      this.selectedMessageConversationDetails.is_offer_accepted = false;
    },
    cancelOffer() {
      this.selectedMessageConversations.push({
        message: `Cancelled the offer ${this.currency}. ${this.offerField}`,
        sent_by: "me",
        contains_image: false,
        created_at: "Just now",
      });
      this.selectedMessageConversationDetails.is_made_an_offer = false;
    },
    showReviewModal() {
      this.modals.isOpenReviewModal = true;
      document.body.classList.add("hide-body-overflow");
    },
    hideReviewModal() {
      this.modals.isOpenReviewModal = false;
      document.body.classList.remove("hide-body-overflow");
    },
    chatOptionToRun(chatOption) {
      if (chatOption === "delete-chat") {
        this.alert.dismissCountDown = this.alert.dismissSecs;
        this.alert.content = "Message deleted.";
      }
    },
    countDownChanged(count) {
      this.alert.dismissCountDown = count;
    },
  },
};
</script>
