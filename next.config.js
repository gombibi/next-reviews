/** @type {import('next').NextConfig} */
module.exports = {
  //Static Export & Static Hosting
  //output 옵션: npm run build 시, .next 폴더가 아닌 out 폴더에 정적 파일들(html)이 생성됨
  //설정하지 않을 시 노드 서버를 통해 SSR, CSR을 모두 지원하는 hybrid 앱이 빌드됨(next start) -> 매우 복잡한 빌드 산출물
  //하지만 CSR만 필요하여 cdn이나 nginx와 같은 간단한 웹서버를 이용해 웹앱을 배포하고 싶은 경우에 static export!
  //serve를 통해 간단하게 웹서버 환경에서 테스트를 할 수 있다(npx serve@latest out)
  //Netlify에 out 폴더를 업로드하여 배포 가능
  //import from Git like Vercel or option to deploy manually by uploading a folder using drag and drop

  //static file을 loading하지 않고, CMS를 통해 data를 fetching하여도 여전히 static export 가능!
  //All our pages are statically generated including the dynamic route
  //All the data will be fetched during the build.
  //--test : npm run build 시 Route 경로에 페이지들이 미리 생성된 것을 확인할 수 있음
  //--locally test : npx serve@latest out
  //All the content for each review has been incorporated into the HTML for each page during the build.
  //So, when running the static website, we don't actually need access to the API.
  output: 'export',
};