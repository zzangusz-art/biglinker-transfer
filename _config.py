# _config.py — transfer 서브도메인 전용 설정
# build.py 가 이 파일을 import해서 사용합니다.

SITE_VARS = {
    # family-bar 활성 상태 (해당 서브도메인만 "is-active")
    "FAMILY_ACTIVE_TRANSFER": "is-active",
    "FAMILY_ACTIVE_GRADUATE": "",
    "FAMILY_ACTIVE_JOB":      "",
    "FAMILY_ACTIVE_BIZ":      "",
}

# 서비스별 category tabs HTML (active_tab 변수는 각 .page.html META에서 읽어옴)
CATEGORY_TABS_ITEMS = [
    ("admissions",        "대입코칭"),
    ("self-introduction", "페이퍼코칭"),
    ("interview-coaching","면접코칭"),
    ("thesis-coaching",   "논문코칭"),
    ("ec-coaching",       "EC코칭"),
    ("design-coaching",   "디자인코칭"),
]
