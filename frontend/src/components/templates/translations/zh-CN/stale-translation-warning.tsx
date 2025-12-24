import Admonition from "../../../Admonition";

export default function StaleTranslationWarning({
  englishDocLink,
}: {
  englishDocLink: string;
}) {
  return (
    <Admonition type="warning">
      <p>
        <strong>翻译可能已过时</strong>
      </p>
      <p>本文档的英文版本近期已有更新，当前翻译可能未能体现最新修改。</p>
      <p>
        欢迎帮助我们保持翻译同步！如果你擅长此语言，不妨查看{" "}
        <a href={englishDocLink}>英文版本</a> 并据此更新译文。
      </p>
    </Admonition>
  );
}
