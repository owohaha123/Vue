import { ref, onUnmounted } from 'vue'

export const useToast = () => {
    const showToast = ref(false);
      const toastMessage = ref('');
      const toastAlertType = ref('');
      const timeout = ref(null);
      const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;

        timeout.value = setTimeout(()=>{
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        },2000)
      }

    //메모리 누수 관리
    //페이지 이동 시 timeout 함수 실행 x
    onUnmounted(()=>{
        clearTimeout(timeout.value);
    })

      return{
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
      }
}