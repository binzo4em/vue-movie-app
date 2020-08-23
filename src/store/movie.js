import axios from 'axios'

export default {
    namespaced: true,
    state:() => ({
        title : '',
        loading: false,
        movies: []
    }),
    getters: {},
    // 비동기 처리 불가
    mutations: {
        updateState (state, payload) {
            // payload에 있는 key들을 문자열로 만들고 반복적으로 사용 가능
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        pushIntoMovies (state, movies) {
            // item 단위로 push 하기 위해 ...movies 사용
            state.movies.push(...movies)
        }
    },
    // 비동기 처리 가능
    actions: {
        // async resolve, await axios 사용하면 ESLint에 의해 에러 발생 (강의대로 하면 에러)
        // async, await 삭제하면 됨
        fetchMovies ({ state, commit }, pageNum) {
            return new Promise(async resolve => {
                const res = await axios.get(`https://www.omdbapi.com/?apikey=b4a7f08a&s=${state.title}&page=${pageNum}`)
                commit('pushIntoMovies', res.data.Search)
                resolve(res.data)
            })
        },
        async searchMovies ({ commit, dispatch }) {          
            commit('updateState', {
                loading: true,
                movies: [] // 기존의 데이터와 병합되지 않게 초기화
            })
            // axios는 비동기 방식
            //const res = await axios.get(`http://www.omdbapi.com/?apikey=b4a7f08a&s=${state.title}&page=1`)
            //const pageLength = Math.ceil(res.data.totalResults / 10) // 올림 처리
            
            // fetchMovies에서 promise가 반환되기 때문에 앞에 await를 사용할 수 있다.
            // dispatch : store의 actions 부분이 메소드 실행 시
            const { totalResults } = await dispatch('fetchMovies', 1)
            const pageLength = Math.ceil(totalResults / 10) // 올림 처리

            if (pageLength > 1) {
                for (let i = 2; i <= pageLength; i += 1) {
                    if (i > 4) break
                    await dispatch('fetchMovies', i)
                }
            }

            commit('updateState', {
                loading: false
            })
        }
    },
}