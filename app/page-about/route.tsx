import { LinksFunction } from "@remix-run/node";

import aboutStylesHref from "./about.css?url";
import { PageLayout } from "~/components/PageLayout";
import { generateMeta } from "utils/generateMeta";

export const meta = generateMeta(() => ({
  title: "소개",
  description: "사색송어 소개",
}));

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: aboutStylesHref },
];

export default function ArticlePage() {
  return (
    <PageLayout className="about">
      <PageLayout.Inner>
        <img
          alt="로고"
          className="about-logo"
          srcSet="/images/logo/logo.png 1x, /images/logo/logo@2x.png 2x, /images/logo/logo@3x.png 3x"
          src="/images/logo/logo.png"
        />
        <section className="about-section about-site">
          <h1 className="about-section-title">
            <strong>사색송어</strong>는⋯
          </h1>
          <div className="about-section-content">
            사색송어는 안희종의 개인 홈페이지입니다. 이름은 어슐러 르 귄의
            『머나먼 바닷가』 속 한 구절에서 따왔습니다.
            <blockquote>
              아렌, 중대한 결정을 내려야 할 때에 섣부르게 택하지 말도록 해라.
              어렸을 때 나는 존재하는 삶과 행위하는 삶 사이에서 선택을 해야
              했단다. 그러곤 송어가 파리를 물듯 덥석 행위의 삶을 택했지. 그러나
              사람이 한 일 하나하나, 그 한 동작 한 동작이 그 사람을 그 행위에
              묶고 그로 인해 빚어진 결과에 묶어 버린단다. 그리하여 계속 또
              행동하도록 만드는 거다. 그러면 지금처럼 행동과 행동 사이의 빈틈에
              다다르기란 정말로 어려워지지. 행동을 멈추고 그저 존재할 시간,
              자신이 대체 누굴까를 궁금해할 기회를 가질 수 없는 거다.
            </blockquote>
            처음 읽은 후로 이 구절이 시간이 지날수록 점점 가슴 속에 깊게
            자리잡았습니다. 결국 홈페이지 이름으로까지 짓게 되었습니다.
            <br />
            <br />
            송어가 파리를 물듯 행위하는 삶 사이, 그저 존재하며 자신이 대체
            누굴까를 궁금해할 시간을 가질 수 있는 사람이고 싶습니다. 글을
            쓰다보면 조금은 더 그럴 수 있는 것 같습니다.
          </div>
        </section>
        <section className="about-section about-site">
          <h1 className="about-section-title">
            <strong>안희종</strong>은⋯
          </h1>
          <div className="about-section-content">
            <a href="https://flex.team" target="_blank" rel="noreferrer">
              플렉스팀
            </a>
            에서 프로덕트 매니저로 일합니다. 배우자와 두 고양이와 함께 살고
            있습니다. 책, 음악, 영화, 게임을 가리지 않고 좋아합니다. 아름다운
            것에 반하는 이들에게 반합니다.
            <br />
            <br />
            요즈음은, 내가 과연 언젠가 예술을 만들고 사람들에게 무언가를 느끼게
            하는 삶을 살 수 있을지 궁금해하고 있습니다.
            <br />
            <br />
            내가 누구인지 소개한다는 게 참 쉬워야 하는 것 같은데 쉽지 않네요.
          </div>
        </section>
      </PageLayout.Inner>
    </PageLayout>
  );
}
