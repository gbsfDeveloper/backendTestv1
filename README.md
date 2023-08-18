## Receipts Processor

### Before beggining:

You need to have installed docker on your PC.  :+1:

### How to run:

    1.- Download the project with git:

    ```
        git clone https://github.com/gbsfDeveloper/backendTestv1.git
    ```

    2.- In the superior folder of the project downloaded in the step before run the follow

    ```
        git clone https://github.com/gbsfDeveloper/backendTestv1.git
    ```

    3.- Next run follow

    ```
        docker build .\<gitProjectDownloadName>\ -t <someNameYouLike>:latest
    ```
    
    example:

    ```
        docker build .\backendTest\ -t backendtest:latest
    ```

    4.- Next run follow to run the docker image

    ```
        docker run --name api -p 3000:3000/tcp -d <someNameYouLike>
    ```

    example:

    ```
        docker run --name api -p 3000:3000/tcp -d backendtest
    ```

    5.- Ready to test!!!!

    You can go to http://localhost:3000/api-docs/ to see a documentation of project and test an example in this local swagger web

    Or if you want open postman and test the apis manualy with the follow apis
    
    ```
        /receipts/process
        /receipts/<id>/points
    ```

