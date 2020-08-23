<template>
  <v-app>
    <!-- v-container : 화면 중앙에 배치하도록 함 -->
    <v-container>
      <!-- 검색바 -->
      <search-bar/>
      <!-- 영화 목록 -->
      <movie-list></movie-list>
    </v-container>
  </v-app>
</template>

<script>
/**
 * vue-cli에서 절대경로 별칭이 @으로 정의되어 있다.
*/
import SearchBar from '@/components/SearchBar'
import MovieList from '@/components/MovieList'

export default {
  components: {
    SearchBar,
    MovieList
  }
}
</script>
