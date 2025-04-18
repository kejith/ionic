<script setup>
import { ref, computed, onMounted } from 'vue'

// Sample image data - replace with your actual data source
const images = ref([
  { id: 1, src: 'https://picsum.photos/id/10/300/300', title: 'Image 1' },
  { id: 2, src: 'https://picsum.photos/id/20/300/300', title: 'Image 2' },
  { id: 3, src: 'https://picsum.photos/id/30/300/300', title: 'Image 3' },
  { id: 4, src: 'https://picsum.photos/id/40/300/300', title: 'Image 4' },
  { id: 5, src: 'https://picsum.photos/id/50/300/300', title: 'Image 5' },
  { id: 6, src: 'https://picsum.photos/id/60/300/300', title: 'Image 6' },
  { id: 7, src: 'https://picsum.photos/id/70/300/300', title: 'Image 7' },
  { id: 8, src: 'https://picsum.photos/id/80/300/300', title: 'Image 8' },
  { id: 9, src: 'https://picsum.photos/id/90/300/300', title: 'Image 9' },
  { id: 10, src: 'https://picsum.photos/id/100/300/300', title: 'Image 10' },
  { id: 11, src: 'https://picsum.photos/id/110/300/300', title: 'Image 11' },
  { id: 12, src: 'https://picsum.photos/id/120/300/300', title: 'Image 12' },
  { id: 13, src: 'https://picsum.photos/id/130/300/300', title: 'Image 13' },
  { id: 14, src: 'https://picsum.photos/id/140/300/300', title: 'Image 14' },
  { id: 15, src: 'https://picsum.photos/id/150/300/300', title: 'Image 15' },
  { id: 16, src: 'https://picsum.photos/id/160/300/300', title: 'Image 16' },
  { id: 17, src: 'https://picsum.photos/id/170/300/300', title: 'Image 17' },
  { id: 18, src: 'https://picsum.photos/id/180/300/300', title: 'Image 18' },
  { id: 19, src: 'https://picsum.photos/id/190/300/300', title: 'Image 19' },
  { id: 20, src: 'https://picsum.photos/id/200/300/300', title: 'Image 20' },
])

const selectedImage = ref(null)
const gridRef = ref(null)
const columnsCount = ref(4)
const rowsMap = ref(new Map())
const placeholders = ref([])

// Calculate the proper layout based on viewport
onMounted(() => {
  calculateLayout()
  window.addEventListener('resize', calculateLayout)
})

const calculateLayout = () => {
  if (!gridRef.value) return

  // Calculate optimal number of columns based on viewport width
  const containerWidth = gridRef.value.clientWidth
  const imageSize = Math.floor(containerWidth / Math.floor(containerWidth / 200))
  columnsCount.value = Math.floor(containerWidth / imageSize)

  // Calculate which row each image belongs to
  const newRowsMap = new Map()
  images.value.forEach((image, index) => {
    const rowIndex = Math.floor(index / columnsCount.value)
    if (!newRowsMap.has(rowIndex)) {
      newRowsMap.set(rowIndex, [])
    }
    newRowsMap.get(rowIndex).push(image)
  })

  // Generate placeholder items for the last row if needed
  placeholders.value = []
  const lastRowIndex = Math.floor((images.value.length - 1) / columnsCount.value)
  const lastRowItems = newRowsMap.get(lastRowIndex) || []
  const placeholdersNeeded = columnsCount.value - lastRowItems.length

  if (placeholdersNeeded > 0 && lastRowItems.length > 0) {
    for (let i = 0; i < placeholdersNeeded; i++) {
      placeholders.value.push({ id: `placeholder-${i}`, isPlaceholder: true })
    }
    if (!newRowsMap.has(lastRowIndex)) {
      newRowsMap.set(lastRowIndex, [])
    }
    newRowsMap.get(lastRowIndex).push(...placeholders.value)
  }

  rowsMap.value = newRowsMap
}

const rows = computed(() => {
  return Array.from(rowsMap.value.entries()).map(([rowIndex, rowImages]) => {
    return {
      rowIndex,
      images: rowImages,
      expanded:
        selectedImage.value &&
        Math.floor(
          images.value.findIndex((img) => img.id === selectedImage.value.id) / columnsCount.value,
        ) === rowIndex,
    }
  })
})

const selectImage = (image) => {
  if (image.isPlaceholder) return

  if (selectedImage.value && selectedImage.value.id === image.id) {
    selectedImage.value = null
  } else {
    selectedImage.value = image
  }
}

const getSelectedRowIndex = computed(() => {
  if (!selectedImage.value) return -1
  const imageIndex = images.value.findIndex((img) => img.id === selectedImage.value.id)
  return Math.floor(imageIndex / columnsCount.value)
})
</script>

<template>
  <div class="image-board" ref="gridRef">
    <div
      v-for="row in rows"
      :key="row.rowIndex"
      class="image-row"
      :class="{
        'after-expanded': row.rowIndex > getSelectedRowIndex && getSelectedRowIndex !== -1,
      }"
    >
      <div
        v-for="image in row.images"
        :key="image.id"
        class="image-container"
        @click="selectImage(image)"
        :class="{
          selected: selectedImage && selectedImage.id === image.id,
          placeholder: image.isPlaceholder,
        }"
      >
        <img v-if="!image.isPlaceholder" :src="image.src" :alt="image.title" />
      </div>
    </div>

    <div
      v-if="selectedImage"
      class="image-detail"
      :style="{
        top: `${(Math.floor(images.findIndex((img) => img.id === selectedImage.id) / columnsCount) + 1) * (100 / Math.ceil(images.length / columnsCount))}vh`,
      }"
    >
      <div class="detail-content">
        <img :src="selectedImage.src" :alt="selectedImage.title" />
        <div class="detail-info">
          <h3>{{ selectedImage.title }}</h3>
          <p>Additional details about the image can go here</p>
          <button @click="selectedImage = null">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-board {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.image-row {
  display: flex;
  flex: 1;
  min-height: 0;
  transition: transform 0.3s ease-out;
}

.image-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.image-container.placeholder {
  cursor: default;
  background-color: transparent;
}

.image-container:hover:not(.placeholder) {
  z-index: 1;
  transform: scale(1.02);
}

.image-container.selected {
  border: 2px solid hsla(160, 100%, 37%, 1);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-detail {
  position: absolute;
  left: 0;
  right: 0;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  overflow: hidden;
  animation: slide-down 0.3s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.detail-content {
  display: flex;
  max-width: 1200px;
  width: 100%;
  height: 100%;
}

.detail-content img {
  max-height: 100%;
  max-width: 60%;
  object-fit: contain;
}

.detail-info {
  padding: 20px;
  color: white;
  flex: 1;
}

.after-expanded {
  transform: translateY(50vh);
}

@keyframes slide-down {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 50vh;
    opacity: 1;
  }
}

/* Make the grid responsive */
@media (max-width: 768px) {
  .detail-content {
    flex-direction: column;
  }

  .detail-content img {
    max-width: 100%;
    max-height: 50%;
  }
}
</style>
