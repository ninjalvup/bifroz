<template>
  <div class="container">
    <vue-tree
      style="width: 1000px; height: 600px; border: 1px solid gray;"
      :dataset="richMediaData"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node text-center"
           ref="domContainer"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <img
            :src="node.avatar"
            style="width: 48px; height: 48px; border-raduis: 4px; text-align:center;"
          />
          <span style="padding: 4px 0; font-weight: bold; "
            >{{node.name}}
             <br>
            {{ node.value }}</span
          >
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>
export default {
  name: 'treemap',
  data() {
    return {
      richMediaData: {
        name: 'toey',
        value: 800,
        avatar:
          'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg',
        children: [
          {
            name: 'Bob',
            value: 400,
            avatar:
              'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg',
            children: [
              {
                name: 'C1',
                value: 100,
                avatar:
                  'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg'
              },
              {
                name: 'C2',
                value: 300,
                avatar:
                  'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg'
              },
              {
                name: 'C3',
                value: 200,
                avatar:
                  'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg',
                  children: [
              {
                name: 'S1',
                value: 230,
                avatar:
                  'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg'
              }
            ]
              }, 
               
            ]
          },
          {
            name: 'Smith',
            value: 200,
            avatar:
              'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg',
            children: [
              {
                name: 'S1',
                value: 230,
                avatar:
                  'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg'
              }
            ]
          },
          {
            name: 'Jackson',
            value: 300,
            avatar:
              'https://img2.thaipng.com/20180402/ixw/kisspng-caricature-physics-physicist-general-relativity-einstein-5ac27d7ab0b0c9.2945073115226955467237.jpg'
          }
        ]
      },
      treeConfig: { nodeWidth: 60, nodeHeight: 80, levelHeight: 100 }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: rgb(2, 2, 2);
  font-size: 12px;

  border-radius: 4px;
}
.tree-container .link {
    stroke-width: 2px !important;
    fill: transparent !important;
    stroke: #d1caff !important;
}


</style>