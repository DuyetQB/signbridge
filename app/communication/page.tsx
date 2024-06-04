import dynamic from "next/dynamic";
import Breadcrumb from "@/components/Common/Breadcrumb";
// import Communication from "@/components/Communication";
const Communication = dynamic(() => import('@/components/Communication'), { ssr: false });

const CommunicationPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Giao tiếp với SignMeet"
        description="SignMeet là một công cụ stream video dịch trực tiếp. Tương lai nó sẽ trở thành một ứng dụng trò chuyện và dịch trực tiếp ngôn ngữ ký hiệu và biến nó thành ngôn ngữ dạng văn bản hoặc giọng nói.
         Bạn có thể dùng thử bản thử nghiệm của chúng tôi ở dưới đây. Chúng tôi vẫn đang cải tiến các tính năng từng ngày để hệ thống có thể hoạt động chính xác hơn nữa trong tương lai."
      />
      <Communication />
    </>
  );
};

export default CommunicationPage;
