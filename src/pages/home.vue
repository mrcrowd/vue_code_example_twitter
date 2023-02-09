<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div v-else>
    <div class="tweet-menu-wrapper">
      <div class="tweet__menu">
        <select name="sortBy" v-model="sortBy">
          <option value="date">Sort by date</option>
          <option value="likes">Sort by likes</option>
        </select>
      </div>
    </div>

    <div class="tweets__wrapper" v-for="item in dataSorted" :key="item.id">
      <Tweet
        :id="item.id"
        :imgUrl="item.avatar"
        :likes="item.likes"
        :name="item.date"
        @onClick="handleLikeSubmit(item)"
      >
        <div v-html="compiledMarked(item.body)"></div>
      </Tweet>
    </div>

    <button @click="handleModalShow" class="btn btnTweet btnTweetHome">
      NEW TWEET
    </button>
    <Modal title="New Tweet" v-if="showModal" @onClose="handleModalShow">
      <form @submit.prevent="handleStore">
        <textarea name="body" id="body" v-model="tweet.body"></textarea>
        <button class="btn btnTweet" type="submit">Submit</button>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue'
import { marked } from 'marked'
import http from '@/http-common'
import Spinner from '@/components/UI/Spinner'
import Modal from '@/components/UI/Modal'
import Tweet from '@/components/UI/Tweet'
import TweetForm from '@/components/UI/TweetForm'

onMounted(() => getTweets())

const getTweets = () => {
  http
    .get('/tweets.json')
    .then(res => {
      const nextData = []

      Object.keys(res.data).forEach(key => {
        const item = res.data[key]
        nextData.push({ id: key, ...item })
      })

      data.value = nextData
      isLoading.value = false
    })
    .catch(e => console.log(e))
}

const isLoading = ref(true)

const data = ref([])

const sortBy = ref('date')
const dataSorted = computed(() => {
  return data.value.sort((a, b) => {
    if (a[sortBy.value] < b[sortBy.value]) return 1
    if (a[sortBy.value] > b[sortBy.value]) return -1
  })
})

const tweet = reactive({
  date: null,
  body: '',
  likes: 0,
  avatar: null
})

const handleStore = () => {
  tweet.avatar = `https://avatars.dicebear.com/api/male/${Date.now()}.svg`
  tweet.date = new Date(Date.now()).toLocaleString()
  http.post('/tweets.json', tweet).then(() => {
    tweet.body = ''
    getTweets()
    handleModalShow()
  })
}

const showModal = ref(false)
const handleModalShow = () => {
  const nextShowModal = (showModal.value = !showModal.value)
  showModal.value = nextShowModal
}

const handleLikeSubmit = tweet => {
  tweet.likes += 1
  http
    .put(`/tweets/${tweet.id}.json`, tweet)
    .then(() => {})
    .catch(e => {
      console.log(e)
      tweet.likes -= 1
    })
}

const compiledMarked = text => {
  return marked.parse(text)
}
</script>
