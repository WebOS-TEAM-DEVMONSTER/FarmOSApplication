# FarmOSApp
Farm OS 어플리케이션입니다.


# 사용법



## 처음 시작할 때
1. vscode에서 webos studio 개발 환경을 갖춘다.
2. webos studio에서 워크스페이스 폴더를 지정한다.
3. 워크스페이스 폴더에서 git clone을 통해 해당 프로젝트를 다운로드 한다.
4. 이후, 해당 프로젝트에서 개발 작업을 수행하면 된다.


## 프로세스

소정씨는 A라는 파트를, 동현씨는 B라는 파트를 각자 이번주까지 맡아서 수행해야 한다.
깃허브는 프로젝트와 프로젝트 버젼 자체를 관리하는 툴이므로, 개인 저장소 처럼 쓰기에는 적절하지 않다.
그래서 개인별로 브랜치를 생성하였다. 소정 -> sojung, 동현 -> donghyeon
![image](https://github.com/user-attachments/assets/45e3c060-cb1a-40d2-9b24-3eeab85184b5)



## 업로드 (push)
소정씨는 A라는 파트를, 동현씨는 B라는 파트를 각자 구현하였고, 이제 업로드 해야한다.

깃허브의 구조는 원격 저장소(웹으로 볼 수 있는것)와 로컬 저장소(내 컴퓨터에만 저장되는것)으로 나뉜다.
우리가 업로드(서로 업로드 해야 하니깐 원격 저장소에 업로드)하기 위해서는 다음과 같은 과정이 필요하다.

1. 로컬 저장소를 생성한다  % git init

2. 프로젝트 폴더 내에 있는 모든 변경된 파일 및 폴더를 선택한다  % git add .

3. 2.에서 선택된 폴더 파일을 커밋한다  % git commit -m "**first commit**"  

// 쌍따움표는 입력해야하고 first commit 대신 내가 구현한 내용에 대해 간략하게 작성한다. 예시: git commit -m "첫번째 커밋"

4. **(처음 업로드하는 경우에만)** 로컬 저장소와 원격 저장소를 연결한다.  % git remote add origin **주소**

5. **(처음 업로드 하는 경우에만 사용해야 함)** 깃에다 push 한다.  % git push origin -u **브랜치명(sojung or donghyeon)** 

6. (처음 업로드 하는것이 아닌 경우) 깃에다 push 한다.  % git push origin **브랜치명(sojung or donghyeon)** 

-u 는 로컬 브랜치와 원격 브랜치를 연결한다는 의미다. 연결을 1번만 하면 계속 연결 상태가 유지되며, -u를 2번 이상 사용할 경우, 오히려 추적이 복잡해질 수 있다.


이러면 방금 push한 개인 브랜치가 최신 버젼이 될 것이다. 그럼 develop 브랜치에서도 개인 브랜치의 업데이트를 적용시켜야 한다.

이 때 깃허브 프로젝트 페이지나 vscode의 확장 프로그램 중 하나를 이용하여, Pull Request를 실행한다.

## 풀 리퀘스트 (pull request)


깃허브 프로젝트 페이지가 접근성이 좋으므로, 이를 기준으로 설명하겠다.
![image](https://github.com/user-attachments/assets/6ed5b131-371c-4ec6-b334-1336940d7003)

1. 위 화면에서 Pull Requests를 클릭한다.
2. New pull request를 클릭한다.
3. base: develop 브랜치, compare: 내가 방금 push한 브랜치로 설정하고, create pull request 버튼을 클릭한다.
4. 내용을 입력하고 pull requset를 올린다.
5. (어려우면 안해도 됨) 서로 작성한 코드를 확인하여 리뷰를 진행한다.(평가, 궁금한 점 제시 등등)
6. merge를 누른다.

## git pull
이것은 중요한 작업이다. 이 작업을 생략할 경우, 업로드(push)가 제한될 수 있다.

소정씨는 A라는 파트를, 동현씨는 B라는 파트를 각자 구현하였고, push와 pull request를 통해 merge과정을 수행했다.
이렇게되면, develop 브랜치는 sojung 브랜치와 donghyeon 브랜치가 합쳐진 궁극의 브랜치가 되어있을 것이다.

이제 소정씨는 C라는 파트를, 동현씨는 D라는 파트를 구현할 계획을 세웠다.

이렇게 되면 sojung 브랜치는 A 파트만, donghyeon 브랜치는 B 파트만, develop 브랜치는 A, B 파트가 있는 상태이다.

여기서 C, D 파트를 개발하기 전에, sojung 브랜치와 donghyeon 브랜치도 똑같이 A,B 파트를 가지도록 develop 브랜치와 동기화를 해야한다.

이 과정을 수행하지 않으면, 다음 업로드에서 develop 버젼이 맞지 않아 오류가 발생할 수 있다.

git pull을 하기위해 다음과 같은 과정을 거친다.
서로 개인 브랜치에서 작업한 상태이기에, 현재 브랜치는 개인 브랜치(sojung or donghyeon)로 되어있을 것이다.
(%git branch 명령어를 통해 확인할 수 있다.)

1. develop 브랜치로 이동한다.  % git checkout develop

2. git pull을 진행한다.  % git pull origin develop

3. 다시 개인 브랜치로 이동한다.  % git checkout -

4. merge를 실행한다.  % git merge develop


이제 각자 C, D 파트 개발을 진행하면 된다.





## git pull (과정 중간에 업데이트 해야 할 경우)

소정씨는 A라는 파트를, 동현씨는 B라는 파트를 각자 구현하는 중에 A 파트에서 B 파트의 일부가 필요하다면, 구현을 못할 것이다. (이러한 경우가 없도록 계획하는것이 좋다.)

위와 같은 경우일때만 아래를 내용을 읽어보자

현재 개발중인 A 파트를 A', 현재 개발중인 B 파트를 B'라고 하겠다.

만약 이러한 경우가 생긴다면 develop 브랜치에 B' 만 업데이트시키고, 그것을 A에 받아와서 쓸 수 있다.
그래서, 위와 같은 과정으로 push와 pull request를 성공했다면, 소정씨는 는 임시로 B'를 받아와야한다.

이때 소정씨는

1. 임시 저장소를 생성한다.  % git stash

2. develop 브랜치로 이동한다.  % git checkout develop

3. git pull을 진행한다.  % git pull origin develop

4. 다시 개인 브랜치로 이동한다.  % git checkout -

5. merge를 실행한다.  % git merge develop

6. 임시 저장소를 삭제한다.  % git stash pop


1.에서 임시 저장소는 A' 파트를 저장한다.
2. ~ 5. 과정에서 A' 파트가 B' 파트로 바뀐다.
6.에서 임시 저장소가 pop될 때, B' 파트에 A' 파트가 더해진다.