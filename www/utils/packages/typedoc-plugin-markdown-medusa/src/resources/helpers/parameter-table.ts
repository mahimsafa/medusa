import Handlebars from "handlebars"
import { parseParams } from "../../utils/params-utils.js"
import { ReflectionParameterType } from "../../types.js"
import {
  getTableHeaders,
  reflectionTableFormatter,
} from "../../utils/reflection-formatter.js"

export default function () {
  Handlebars.registerHelper(
    "parameterTable",

    function (this: ReflectionParameterType[]) {
      const parameters = this.reduce(
        (acc: ReflectionParameterType[], current: ReflectionParameterType) =>
          parseParams(current, acc),
        []
      )

      const headers = getTableHeaders(parameters)

      const rows = parameters.map((parameter) =>
        reflectionTableFormatter({
          reflection: parameter,
        })
      )

      return `\n| ${headers.join(" | ")} |\n| ${headers
        .map(() => ":------")
        .join(" | ")} |\n${rows.join("")}`
    }
  )
}
