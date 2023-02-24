<?php

namespace QsCusPoster;

use Bootstrap\Provider;
use Bootstrap\RegisterContainer;
class CusPosterProvider implements Provider
{
    public function register()
    {
        RegisterContainer::registerSymLink(WWW_DIR . '/Public/cusposter', __DIR__ . '/../js/dist');
    }
}