<?php

preg_match('/(foo)(bar)(baz)/', 'foobarbaz', $matches);
print_r($matches);

preg_match_all('/(foo.?)(bar)(baz)/', 'foobarbaz__fooxbarbaz', $matches);
print_r($matches);

preg_match_all('/(foo.?)(bar)(baz)/', 'foobarbaz__fooxbarbaz', $matches, PREG_SET_ORDER);
print_r($matches);
