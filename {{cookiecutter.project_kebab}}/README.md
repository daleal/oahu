# {{cookiecutter.project_title}}

Lightweight Koa template built with `Docker` and `docker-compose` to **_plug and play_** with a final image size of just `~301MB`.

## Running Locally

### Requirements

The requirements for this template are simple:

* `Docker`
* `Docker Compose`

Additionally, to deploy to `heroku` you will need:

* `Heroku`

### Plug and Play

This repo comes with a `docker-compose.yml` file to handle using a `postgres` image pulled from the web and to use a `.env` file for environmental variables. As such, `compose` requires a `.env` file to function, so run:

```
cp .env.example .env
```

After that, configure the `.env` file as you please and `compose` is now ready to be used.

To get started quickly, build the image:

```
docker-compose build
```

Finally, start the server:

```
docker-compose up
```

Your app can now be found in `localhost:3000`. From now on, every command regarding the app that should be run as `[COMMAND]` will now be run as `docker-compose run web [COMMAND]`. This includes database migrations (`docker-compose run web sequelize db:migrate`).

### Caveats (or, may I say, Docker and Windows)

If you are using `Docker` on _Linux_ or `Docker` on _MacOS_, chances are your usage process has been almost flawless, and the instructions given in the tutorial worked at the first try. However, if you are using `Docker Toolbox` on Windows or `Docker for Windows` on Windows, things are different. Mainly, two things change:

* Due to the technology being run inside a _Virtual Machine_, instead of finding your app in `localhost:3000`, your app will be defaulted to `192.168.99.100:3000` and will **not** be found in `localhost:3000`.
* Due to the database volume being mounted to a _named volume_ created by the _Virtual Machine_, every Docker update **will** wipe your database clean. When using for development purposes, some simple seeds are enough to make this a _no-problem_. Keep an eye if that is your production environment, though, as data **will** be lost if you are not careful.

### Docker Image

The image generated by `docker-compose build` with the original repo has a size of just `~301MB`, and contains a standard Koa app using `koa-router`, `postgresql` as the database, `sequelize` as the ORM, `sass` as the stylesheet pre-processor, `node 12.16` as the JavaScript runtime and `react` as the frontend framework.

### When to Build

The command `docker-compose build` must be used only in 2 cases:

1. Changes in the `package.json`: `docker-compose build` will notice if either the `package.json` or the `yarn.lock` present any changes. If so, it will re-run `yarn install` to update the image
2. New `assets`: `docker-compose build` will notice if new assets need to be precompiled and will run `webpack -p` to update the image. This is only relevant on production environments, so don't worry too much about this during development (it is only important to precompile the assets for production environments)

Notice that `Docker` is smart and if you run `docker-compose build` and the `package.json` has not changed and no new `assets` need to be precompiled, `Docker` will use cached layers to build the image, dramatically decreasing the amount of time wasted in your life (hopefully).
## Heroku Deployment

### Automagic Deployment

The template includes a GitHub Action to **automagically** deploy your app to `heroku`! On every push to `master` (or whenever a Pull Request gets merged into `master`), the workflow will trigger and build, push and deploy your app to `heroku`, including database migrations! For this **magic** to work, make sure to do the following stuff:

1. Get your `heroku` API Key from your `heroku` dashboard and add it as a GitHub Secret to your repository with a key corresponding to `HEROKU_API_KEY`.
2. Make sure to have a `heroku` app created. Get the app name and add it as a GitHub Secret to your repository with a key corresponding to `APP_NAME`.
3. Make sure that your app has the `heroku-postgresql` addon provisioned. You can provision it from the dashboard or by running `heroku addons:create heroku-postgresql:hobby-dev -a <appname>` from your terminal, where `<appname>` corresponds to the name of your `heroku` app.

So, to sum up, you should have the following GitHub Secrets in your repo:

- `HEROKU_API_KEY`: your API key for `heroku`
- `APP_NAME`: the name of your app in `heroku`

That's it! Your app should be now deploying **automagically**!

### Manual Deployment

If you still want to deploy your app manually, you can use the Container Registry. To deploy to `heroku` using Container Registry, make sure to be logged in to the platform (`heroku login`). Then, log in to Container Registry:

```
heroku container:login
```

After that, create a new `heroku` app:

```
heroku create
```

Don't forget to add the `heroku-postgresql` addon to your `heroku` app (when deploying to `heroku`, only the Rails app will be deployed, and the `postgres` container used locally must be replaced with the `heroku-postgresql` addon):

```
heroku addons:create heroku-postgresql:hobby-dev
```

This command will add the **free** basic `heroku-postgresql` addon to your app (you can upgrade this later if you desire).

Next, build the image and push it to Container Registry:

```
heroku container:push web
```

Finally, release the image to your app:

```
heroku container:release web
```

**Important Note**: Once your app is created, to push new changes you only have to run `heroku container:push web` and then `heroku container:release web`.

To open the app in a browser, you can run `heroku open`. You can also access directly using the app's URL.

## Additional Features

The template also includes a Pull Request template. That means that every Pull Request's comment will get **automagically** filled with a default structure that can get altered.
