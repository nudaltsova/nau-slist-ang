```aidl
npm install
npx ng-i18n-merge-files -f json -i .\src\main\webapp\assets\ -o .
cat messages.en.json |  jq .translations > src/main/webapp/assets/i18n/en.json
ng build
ng serve
ng serve --configuration=production
```