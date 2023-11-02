/** @type {import('next').NextConfig} */
module.exports = {
  //Static Export & Static Hosting
  //output 옵션: npm run build 시, .next 폴더가 아닌 out 폴더에 정적 파일들(html)이 생성됨
  //설정하지 않을 시 노드 서버를 통해 SSR, CSR을 모두 지원하는 hybrid 앱이 빌드됨(next start) -> 매우 복잡한 빌드 산출물
  //하지만 CSR만 필요하여 cdn이나 nginx와 같은 간단한 웹서버를 이용해 웹앱을 배포하고 싶은 경우에 static export!
  //serve를 통해 간단하게 웹서버 환경에서 테스트를 할 수 있다(npx serve@latest out)
  //Netlify에 out 폴더를 업로드하여 배포 가능
  //import from Git like Vercel or option to deploy manually by uploading a folder using drag and drop
  // output: 'export',
};