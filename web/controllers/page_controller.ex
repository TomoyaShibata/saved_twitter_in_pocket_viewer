defmodule PocketTwitterImageViewer.PageController do
  use PocketTwitterImageViewer.Web, :controller

  require Base
  require Logger
  require PocketTwitterImageViewer.ConstModule
  require Timex

  def index(conn, _params) do
    render conn, "index.html"
  end

  def getRequestCode(conn, _params) do
    headers   = [{"Content-Type", "application/json; charset=UTF-8"}]
    url       = "https://getpocket.com/v3/oauth/request"
    json_data = %{
                  consumer_key: PocketTwitterImageViewer.ConstModule.consumer_key,
                  redirect_uri: "localhost:4000/hello"
                }
                |> Poison.encode!
    
    response = HTTPoison.post!(url, json_data, headers)

    case response do
      %{ status_code: 200, body: body } ->
        json_data = %{
            code: (String.slice body, 5, String.length body)
          }
          |> Poison.encode!
        json conn, json_data
      %{ status_code: code, body: body } -> json conn, body
    end
  end

  def getRequestToken(conn, _params) do
    headers        = [{"Content-Type", "application/json; charset=UTF-8"}]
    authorize_url  = "https://getpocket.com/v3/oauth/authorize"
    authorize_json = %{
        consumer_key: PocketTwitterImageViewer.ConstModule.consumer_key,
        code: PocketTwitterImageViewer.ConstModule.code
      }
      |> Poison.encode!
    
    Logger.info authorize_json

    authorize_response = HTTPoison.post!(authorize_url, authorize_json, headers)

    case authorize_response do
      %{status_code: 200 , body: body} ->
        Logger.info "response: れすぽんすー"
        json conn, body
      %{status_code: code, body: body} ->
        Logger.info "response: #{inspect authorize_response}"
        json conn, body
    end
  end

  def getPocketItems(conn, _params) do
    headers      = [{"Content-Type", "application/json; charset=UTF-8"}]
    url          = "https://getpocket.com/v3/get?consumer_key=#{PocketTwitterImageViewer.ConstModule.consumer_key}"
    access_token = "&access_token=#{PocketTwitterImageViewer.ConstModule.access_token}"
    count        = "&count=30"
    tag          = "&tag=twitter"
    sort         = "&sort='newest'"
    state        = "&state='all'"
    response     = HTTPoison.get!(url <> access_token <> count <> tag <> sort <> state)

    case response do
      %{ status_code: 200 , body: body } ->
        getTweetStatuses(conn, body)
      %{ status_code: code, body: body } ->
        Logger.info "response: #{inspect body}"
        json conn, body
    end
  end

  def getTwitterToken(conn, _params) do
    consumer_key    = "pPSDipRfd3aHaRugamKWWSOpZ"
    consumer_secret = "Sy8FVApAn5LxU8gnGlNvqXLGSlAqXg9fOi35OcsCDMusvqq70T"
    headers         = [
      { "Authorization", "Basic " <> Base.encode64(consumer_key <> ":" <> consumer_secret) },
      { "Content-Type" , "application/x-www-form-urlencoded; charset=UTF-8" }
    ]
    token_url  = "https://api.twitter.com/oauth2/token?grant_type=client_credentials"
    token_body = %{
      grant_type: "client_credentials"
    }
    |> Poison.encode!

    token_response = HTTPoison.post!(token_url, token_body, headers)

    case token_response do
      %{status_code: 200, body: body} ->
        body_json = body|>Poison.decode!
        access_token = Map.get(body_json, "access_token", "zoi")
        Logger.info "response: #{access_token}"
        json conn, body_json
      %{status_code: code, body: body} ->
        Logger.info "response: #{inspect body}"
        json conn, body
    end
  end

  def getTweetStatuses(conn, body) do
    tweet_ids = body
                |> Poison.decode!
                |> Map.get("list", "zoi")
                |> Enum.map(fn({k, v}) -> %{
                      "resolved_url": Map.get(v, "resolved_url", "zoi"), 
                      "sort_id": Map.get(v, "sort_id", "0"),
                      "resolved_title": Map.get(v, "resolved_title")
                  } end)
                |> Enum.sort(&(Map.get(&1, :sort_id)) < Map.get(&2, :sort_id))
                |> Enum.filter(fn(m) -> Regex.match?(~r/status/, Map.get(m, :resolved_url)) end)
                |> Enum.map(fn(m) -> Map.get(m, :resolved_url) |> String.split("/") |> List.last end)
                |> statusesLookup

    json conn, tweet_ids
  end

  def statusesLookup(tweet_ids) do
    url = "https://api.twitter.com/1.1/statuses/lookup.json?id=" <> Enum.join(tweet_ids, ",")
    headers = [{ "Authorization", "Bearer #{PocketTwitterImageViewer.ConstModule.bearer_access_token}" }]

    response = HTTPoison.get!(url, headers)
    case response do
      %{ status_code: 200, body: body } ->
        sorted_body_json = tweet_ids
                           |> Enum.map(fn(tweet_id) ->
                             body
                             |> Poison.decode!
                             |> Enum.find(fn(b) ->
                               Map.get(b, "id_str") == tweet_id
                             end)
                           end)
        sorted_body_json
      %{ status_code: code, body: body } ->
        Logger.info "response: #{inspect body}"
        body
    end
  end
end
