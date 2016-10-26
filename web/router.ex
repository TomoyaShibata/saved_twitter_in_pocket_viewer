defmodule PocketTwitterImageViewer.Router do
  use PocketTwitterImageViewer.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PocketTwitterImageViewer do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/hello", HelloController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", PocketTwitterImageViewer do
    pipe_through :api

    get "/getRequestCode" , PageController, :getRequestCode
    get "/getRequestToken", PageController, :getRequestToken
    get "/getPocketItems" , PageController, :getPocketItems
    get "/getTwitterToken", PageController, :getTwitterToken
    get "/getTweetStatus" , PageController, :getTweetStatus
  end
end
