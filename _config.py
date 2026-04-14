# _config.py — transfer 서브도메인 전용 설정
# build.py 가 이 파일을 import해서 사용합니다.

SITE_VARS = {
    # family-bar 활성 상태 (해당 서브도메인만 "is-active")
    "FAMILY_ACTIVE_TRANSFER": "is-active",
    "FAMILY_ACTIVE_GRADUATE": "",
    "FAMILY_ACTIVE_JOB":      "",
    "FAMILY_ACTIVE_BIZ":      "",
    "BRAND_COPY": "대입·편입·면접·논술 코칭 전문 플랫폼",
}

# 서비스별 category tabs HTML (active_tab 변수는 각 .page.html META에서 읽어옴)
CATEGORY_TABS_ITEMS = [
    ("total-admission-coaching", "대입토탈리드코칭"),
    ("school-record-coaching",   "생기부리드코칭"),
    ("interview-coaching",       "면접리드코칭"),
    ("essay-coaching",           "논술리드코칭"),
]
