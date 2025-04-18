import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('images', () => {
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
    // Add more images as needed
  ])

  const selectedImage = ref(null)

  function selectImage(id) {
    const current = selectedImage.value
    if (current && current.id === id) {
      selectedImage.value = null
    } else {
      selectedImage.value = images.value.find(img => img.id === id)
    }
  }

  function closeDetail() {
    selectedImage.value = null
  }

  return {
    images,
    selectedImage,
    selectImage,
    closeDetail
  }
})
