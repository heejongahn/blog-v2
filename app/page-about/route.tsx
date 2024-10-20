import { LinksFunction } from "@remix-run/node";

import aboutStylesHref from "./about.css?url";
import { PageLayout } from "~/components/PageLayout";
import { generateMeta } from "utils/generateMeta";
import { NavLink } from "@remix-run/react";

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
            사색송어는 안희종의 개인 홈페이지입니다. 이름은 어슐러 르 귄의{" "}
            <a
              href="https://product.kyobobook.co.kr/detail/S000001277248"
              target="_blank"
              rel="noreferrer"
            >
              『머나먼 바닷가』
            </a>{" "}
            속 한 구절에서 따왔습니다.
            <blockquote className="about-quote">
              아렌, 중대한 결정을 내려야 할 때에 섣부르게 택하지 말도록 해라.
              어렸을 때 나는 존재하는 삶과 행위하는 삶 사이에서 선택을 해야
              했단다. 그러곤 송어가 파리를 물듯 덥석 행위의 삶을 택했지. 그러나
              사람이 한 일 하나하나, 그 한 동작 한 동작이 그 사람을 그 행위에
              묶고 그로 인해 빚어진 결과에 묶어 버린단다. 그리하여 계속 또
              행동하도록 만드는 거다. 그러면 지금처럼 행동과 행동 사이의 빈틈에
              다다르기란 정말로 어려워지지. 행동을 멈추고 그저 존재할 시간,
              자신이 대체 누굴까를 궁금해할 기회를 가질 수 없는 거다.
            </blockquote>
            <p>
              처음 읽은 후로 이 구절이 시간이 지날수록 점점 가슴 속에 깊게
              자리잡았습니다. 메모에 적어두고 몇 달마다 한 번씩 꺼내 읽었습니다.
              “ahn.heejong” 이라는 이름 아닌 이름 뿐이던 홈페이지에 제대로 된
              이름을 붙여주고 싶어졌을 때 자연스레 떠올랐습니다.
            </p>
            <p>
              송어가 파리를 물듯 행위하다 보면 끝나있는 하루가 쌓여갑니다. 그
              사이 사이 가만히 존재하고 느끼는, 자신이 대체 누굴까를 궁금해할
              시간을 잃지 않는 사람이고 싶습니다. 글을 쓰다보면 조금은 더 그럴
              수 있는 것 같아 글을 씁니다.
            </p>
          </div>
        </section>
        <section className="about-section about-site">
          <h1 className="about-section-title">
            <strong>안희종</strong>은⋯
          </h1>
          <div className="about-section-content">
            <p>
              <NavLink to="/articles/the-last-job">플렉스팀</NavLink>
              에서 일합니다. 전산학과를 거쳐 소프트웨어 엔지니어로 커리어를
              시작했습니다. 점차 바뀌어가는 관심사를 따르다 보니 지금은{" "}
              <NavLink to="/articles/transition-to-product-manager">
                프로덕트 매니저 역할
              </NavLink>
              을 맡고 있습니다.
            </p>
            <p>
              <NavLink to="/articles/bitter-day-sweet-home">
                사랑하는 배우자와 두 고양이와 함께 삽니다.
              </NavLink>{" "}
              책, 음악, 영화, 게임 등 창작물을 가리지 않고 좋아합니다. 더 잘
              이해하고 느끼기 위해 더 자주 보고 듣고 체험하려 노력합니다.
              아름다운 것에 반하는 이들에게 반합니다.
            </p>
            <p>
              요즈음은 이런 질문들을 갖고 살아요.
              <ul className="about-questions">
                <li className="about-question">
                  나도 언젠가 예술을 만들고 사람들에게 무언가 느끼게 하는 삶을
                  살 수 있을까?
                </li>
                <li className="about-question">
                  <NavLink to="/articles/what-will-you-worship">
                    나는 무엇을 섬기는 삶을 살고 싶은가?
                  </NavLink>
                </li>
                <li className="about-question">
                  <NavLink to="/articles/stairway-and-field">
                    나는 오르고 싶은가, 헤메고 싶은가?
                  </NavLink>
                </li>
                <li className="about-question">
                  <NavLink to="/articles/will-financial-freedom-make-you-free">
                    무엇이 사람을 진정 자유롭게 만드는 걸까?
                  </NavLink>
                </li>
              </ul>
            </p>
          </div>
        </section>
        <time className="about-last-updated">
          Last Updated: 2024. 10. 10 10:30AM (+09:00)
        </time>
      </PageLayout.Inner>
    </PageLayout>
  );
}
