<template>
  <div class="tabs">
    <el-tag
        :key="tag.name" 
        v-for="(tag,index) in tags" 
        :closable="tag.name !== 'home'"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
        size="small" >
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default{
  name:'commonTag',
  data(){
    return{
    }
  },
    computed:{
      ...mapState({
        tags:state => state.tab.tabsList
      })
    },
  methods:{
    ...mapMutations({
       close:'closeTag'
    }),
    changeMenu(item){
      // console.log('change')
      this.$router.push({ name:item.name })
    },
    handleClose(tag,index){
      console.log(tag.name,this.$router.history.current.name)
      // const length = this.tags.length -1
      const routerName = this.$router.history.current.name
      this.close(tag)
      // if (tag.name === this.$router.name){
      //   return;
      // }
      if (tag.name === routerName) {
        this.$router.push({
          name:this.tags[index].name
        })
      }else{
        this.$router.push({
          name:this.tags.name
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabs{
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>