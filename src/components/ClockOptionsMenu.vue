<template>
  <div class="options">
    <div class="option">
      
      <span class="icon"><i class="fas fa-history"></i></span>
      <span class="text">Bugün içinde</span>
      <span class="faded-text">20.00</span>
    </div>
    <div class="option">
      <span class="icon"><i class="far fa-arrow-alt-circle-right"></i></span>
      <span class="text">Yarın</span>
      <span class="faded-text">Cmt, 19:00</span>
    </div>
    <div class="option">
      <span class="icon"><i class="fas fa-angle-double-right"></i></span>
      <span class="text">Gelecek hafta</span>
      <span class="faded-text">Pzt, 09:00</span>
    </div>
    <hr>
    <div class="option">
      <span class="icon"><i class="far fa-calendar-alt"></i></span>
      <span class="text">Tarih ve hafta seçin</span>
      <span class="faded-text"></span>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style scoped  lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

hr{
    color: grey;
}
.options{
    position: absolute;
    top:30px;
    right: 80px;
    width: 300px;
    border-radius: 5px;
    background: white   ;
    z-index:200;
    .option{
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        &:hover{
            background: #EEEE;
        }
        &:first-child{
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        &:last-child{
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;

        }
        .icon{
            padding-left: 10px;
        }
        .text{
            position: absolute;
            left: 30px;
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
            
        }
        .faded-text{
            padding-right:10px;
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
            color: grey;
        }
    }
    
}
</style>
