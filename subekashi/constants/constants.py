DEFAULT_DESCRIPTION = "全て歌詞の所為です。は界隈曲をまとめたサイトです。"

CONST_ERROR = "エラー：python manage.py constを実行してください"

ASIDE_PAGES = [
    {
        "url": "subekashi:top",
        "name": "トップ",
        "icon": "fas fa-home"
    },
    {
        "url": "subekashi:song_new",
        "name": "新規登録",
        "icon": "fa fa-plus"
    },
    {
        "url": "subekashi:songs",
        "name": "検索",
        "icon": "fas fa-search"
    },
    {
        "url": "subekashi:ai",
        "name": "歌詞生成",
        "icon": "fa fa-robot"
    },
    {
        "url": "subekashi:ad",
        "name": "宣伝",
        "icon": "fas fa-bullhorn"
    },
    {
        "url": "article:articles",
        "name": "記事",
        "icon": "fas fa-book"
    },
    {
        "url": "subekashi:contact",
        "name": "お問い合わせ",
        "icon": "fas fa-envelope"
    },
    {
        "url": "subekashi:setting",
        "name": "設定",
        "icon": "fas fa-cog"
    }
]

DEFALT_ICON = "<i class='fas fa-globe'></i>"

ALLOW_MEDIAS = [
    {
        "id": "youtube",
        "name": "YouTube",
        "regex": r"(^|.)youtu.be",
        "idregex": r"youtu\.be/([a-zA-Z0-9_\-]+)",
        "icon": "<i class='fab fa-youtube'></i>",
        "embed": """<iframe width="448" height="252" src="https://www.youtube.com/embed/__id__" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>"""
    },
    {
        "id": "x",
        "name": "X",
        "idregex": r"x\.com/(.+)",
        "regex": r"(^|.)x.com",
        "icon": "<i class='fab fa-twitter'></i>",
        "embed":"""""",
    },
    {
        "id": "nicovideo",
        "name": "ニコニコ動画",
        "idregex": r"watch/sm([0-9]+)",
        "regex": r"(^|.)nicovideo.jp",
        "icon": "<img src='/static/subekashi/image/niconico.png' alt='ニコニコ動画'></img>",
        "embed":"""<iframe width="448" height="252" src="http://embed.nicovideo.jp/watch/sm__id__"></iframe>""",
    },
    {
        "id": "soundcloud",
        "name": "SoundCloud",
        "idregex": r"soundcloud.com/(.+)",
        "regex": r"(^|.)soundcloud.com",
        "icon": "<i class='fab fa-soundcloud'></i>",
        "embed":"""""",
    },
    {
        "id": "scratch",
        "name": "Scratch",
        "idregex": r"projects/([0-9]+)",
        "regex": r"scratch.mit.edu",
        "icon": "<i class='fas fa-cat'></i>",
        "embed":"""<iframe src="https://scratch.mit.edu/projects/__id__/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>""",
    },
    {
        "id": "bandcamp",
        "name": "Bandcamp",
        "idregex": r"album/(.+)",
        "regex": r"(^|.)bandcamp.com",
        "icon": "<i class='fab fa-bandcamp'></i>",
        "embed":"""""",
    },
    {
        "id": "drive",
        "name": "Google Drive",
        "idregex": r"folders/(.+)",
        "regex": r"drive.google.com",
        "icon": "<i class='fab fa-google-drive'></i>",
        "embed":"""""",
    },
    {
        "id": "bilibili",
        "name": "ビリビリ動画",
        "idregex": r"video/(.+)",
        "regex": r"(^|.)bilibili.com",
        "icon": "<img src='/static/subekashi/image/bilibili.png' alt='ビリビリ動画'></img>",
        "embed":"""""",
    },
    {
        "id": "imicom",
        "name": "イミコミュ",
        "idregex": r"",
        "regex": r"imicomweb.com",
        "icon": "<img src='/static/subekashi/image/imicomweb.png' alt='イミコミュ'></img>",
        "embed":"""""",
    },
    {
        "id": "linkcore",
        "name": "LinkCore",
        "idregex": r"linkco.re/(.+)",
        "regex": r"linkco.re",
        "icon": "<i class='fas fa-align-justify'></i>",
        "embed":"""""",
    },
    {
        "id": "bandlab",
        "name": "Bandlab",
        "idregex": r"track/(.+)",
        "regex": r"bandlab.com",
        "icon": "<i class='fas fa-flask'></i>",
        "embed":"""""",
    },
    {
        "id": "newgrounds",
        "name": "ニューグラウンズ",
        "idregex": r"",
        "regex": r"newgrounds.com",
        "icon": "<i class='fas fa-gamepad'></i>",
        "embed":"""""",
    },
]

ALL_MEDIAS = ALLOW_MEDIAS + [
    {
        "id": "other", 
        "name": "URL未登録",
        "idregex": r"",
        "regex": r"^$",
        "icon": "<i class='fas fa-unlink'></i>",
        "embed":"""""",
    },
    {
        "id": "disallow", 
        "name": "許可されていないURL",
        "idregex": r"",
        "regex": r".*",
        "icon": "<i class='fas fa-exclamation-triangle'></i>",
        "embed":"""""",
    }
]