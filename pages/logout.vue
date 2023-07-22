<script setup lang="ts">

const { logout } = useAuthMethods();
const router = useRouter();

logout();

router.push('/');

</script>
