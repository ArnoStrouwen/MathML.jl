var documenterSearchIndex = {"docs":
[{"location":"","page":"MathML","title":"MathML","text":"CurrentModule = MathML","category":"page"},{"location":"#MathML","page":"MathML","title":"MathML","text":"","category":"section"},{"location":"","page":"MathML","title":"MathML","text":"","category":"page"},{"location":"","page":"MathML","title":"MathML","text":"Modules = [MathML]","category":"page"},{"location":"#MathML.MathML","page":"MathML","title":"MathML.MathML","text":"MathML\n\n(Image: ) (Image: )\n\nA parser for the MathML XML standard.\n\nUses Symbolics.jl under the hood for defining equations and uses EzXML.jl for XML parsing.\n\nMathML Specification: https://www.w3.org/TR/MathML3/\n\nExamples:\n\nusing MathML, EzXML, Symbolics, AbstractTrees\nxml = xml\"\"\"<math xmlns=\"http://www.w3.org/1998/Math/MathML\">\n   <apply>\n      <times />\n      <ci>compartment</ci>\n      <ci>k1</ci>\n      <ci>S1</ci>\n   </apply>\n</math>\"\"\"\n\nnum = parse_node(xml)\n# 1-element Vector{Num}:\n#  S1*compartment*k1\n\n# to pretty print the tree use `print_tree`\nprint_tree(xml)\n# math\n# └─ apply\n#    ├─ times\n#    ├─ ci\n#    ├─ ci\n#    └─ ci\n\n# you can also just go directly from EzXML.Document or String\nstr = \"<apply><power/><ci>x</ci><cn>3</cn></apply>\"\nMathML.parse_str(str)\n# x^3\n\n# derivatives also work!\nstr = \"\"\"\n<apply><diff/>\n  <bvar><ci>x</ci><degree><cn>2</cn></degree></bvar>\n  <apply><power/><ci>x</ci><cn>4</cn></apply>\n</apply>\n\"\"\"\nexpand_derivatives(MathML.parse_str(str))\n# 12(x^2)\n\n# there is also a macro @MathML_str to directly call `parse_str`\nml = MathML\"\"\"\n<apply><diff/>\n  <bvar><ci>x</ci><degree><cn>2</cn></degree></bvar>\n  <apply><power/><ci>x</ci><cn>4</cn></apply>\n</apply>\n\"\"\"\nexpand_derivatives(ml)\n# 12(x^2)\n\nCheck the tests in test/parse.jl to see a more exaustive list of what is covered.\n\nTODO:\n\ncalculus:\nivars fix, make ODESystem(parse_node(readxml(\"lorenz.xml\").root)) work\npartial derivatives partialdiff tags\nintegration int tags\neq nodes sometimes needs to be ~ and sometimes needs to be =\noften a var like dPidt is assigned to Differential(time)(Pi) where dPidt is refered to after this \\<eq> (I think solution is Symbolics.diff2term)\ndiffs with no independent variable: like <apply><diff/><ci>f</ci></apply>\npiecewise tags: make heaviside test work\nfix undefined namespacing issues https://github.com/JuliaIO/EzXML.jl/issues/156 \nfix sep tags in cis, take type attribute into account\nto_mathml: julia expr -> mathml. round tripping\n\nDONE:\n\nnested apply\nfix sep/ tags in cn, take type attribute into account \nrational, e-notation, complex, complex polar\nbasic diff handling\nbound variables like bvar, might be lingering issues though\n\n\n\n\n\n","category":"module"},{"location":"#MathML.check_ivs-Tuple{Any}","page":"MathML","title":"MathML.check_ivs","text":"ensure theres only one independent variable, returns false if more than one iv\n\n\n\n\n\n","category":"method"},{"location":"#MathML.disambiguate_equality!-Tuple{Any}","page":"MathML","title":"MathML.disambiguate_equality!","text":"@disambiguate_equality!\n\nutility function to replace <eq> inside piecewise subtrees to disambiguate from the assignement <eq>\n\n\n\n\n\n","category":"method"},{"location":"#MathML.extract_mathml","page":"MathML","title":"MathML.extract_mathml","text":"extract_mathml()\n\ngiven a filename, EzXML.Document, or EzXML.Node returns all of the MathML nodes.\n\n\n\n\n\n","category":"function"},{"location":"#MathML.mathml_to_nums","page":"MathML","title":"MathML.mathml_to_nums","text":"mathml_to_nums()\n\ngiven a filename or an EzXML.Document or EzXML.Node, finds all of the <ci>s and defines them as Symbolics.jl Nums returns a Vector{Num}. Note, the root namespace needs to be MathML\n\n\n\n\n\n","category":"function"},{"location":"#MathML.parse_apply-Tuple{Any}","page":"MathML","title":"MathML.parse_apply","text":"parse_apply(node)\n\nparse an <apply> node into Symbolics form\n\nhow to deal w apply within apply, need to ensure we've hit bottom\n\n\n\n\n\n","category":"method"},{"location":"#MathML.parse_bvar-Tuple{Any}","page":"MathML","title":"MathML.parse_bvar","text":"parse_bvar(node)\n\nparse a <bvar> node\n\n\n\n\n\n","category":"method"},{"location":"#MathML.parse_ci-Tuple{Any}","page":"MathML","title":"MathML.parse_ci","text":"parse_ci(node)\n\nparse a <ci> node\n\n\n\n\n\n","category":"method"},{"location":"#MathML.parse_cn-Tuple{Any}","page":"MathML","title":"MathML.parse_cn","text":"parse_cn(node)\n\nparse a <cn> node\n\n\n\n\n\n","category":"method"},{"location":"#MathML.parse_cn_w_sep-Tuple{Any}","page":"MathML","title":"MathML.parse_cn_w_sep","text":"parse_cn_w_sep(node)\n\nparse a <cn type=\"..\"> node\n\nwhere type ∈ [\"e-notation\", \"rational\", \"complex-cartesian\", \"complex-polar\"]\n\n\n\n\n\n","category":"method"},{"location":"#MathML.parse_diff-Tuple{Any}","page":"MathML","title":"MathML.parse_diff","text":"parse_diff(x)\n\nparse a <diff>\n\n\n\n\n\n","category":"method"},{"location":"#MathML.parse_lambda-Tuple{Any}","page":"MathML","title":"MathML.parse_lambda","text":"parse_lambda(node)\n\nparse a <lambda> node\n\n<lambda>\n  <bvar> x1 </bvar><bvar> xn </bvar>\n   expression-in-x1-xn\n</lambda>\n\n\n\n\n\n","category":"method"},{"location":"#MathML.parse_node-Tuple{Any}","page":"MathML","title":"MathML.parse_node","text":"parse_node(node)\n\ntake a node and parse into Symbolics form\n\n\n\n\n\n","category":"method"},{"location":"#MathML.@MathML_str-Tuple{Any}","page":"MathML","title":"MathML.@MathML_str","text":"@MathML_str(s)\n\nutility macro for parsing xml strings into symbolics\n\n\n\n\n\n","category":"macro"},{"location":"#MathML.@xml_str-Tuple{Any}","page":"MathML","title":"MathML.@xml_str","text":"@xml_str(s)\n\nutility macro for parsing xml strings into node\n\n\n\n\n\n","category":"macro"}]
}
