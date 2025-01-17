{
  inputs = {
    nixpkgs.url = "github:paveloom/nixpkgs/system";
  };

  outputs =
    {
      nixpkgs,
      ...
    }:
    let
      systems = [ "x86_64-linux" ];
      forSystems =
        function:
        nixpkgs.lib.genAttrs systems (
          system:
          function (
            import nixpkgs {
              inherit system;
            }
          )
        );
    in
    {
      devShells = forSystems (pkgs: {
        default = pkgs.mkShell {
          name = "morbo-pwa-shell";
          nativeBuildInputs = with pkgs; [
            bashInteractive
            nixd
            nixfmt-rfc-style

            ios-safari-remote-debug
            ios-webkit-debug-proxy
            nodejs_latest
            typescript-language-server
            vscode-langservers-extracted

            bash-language-server
            dockerfile-language-server-nodejs
            hadolint
            yamlfmt
            yamllint
          ];
        };
      });
    };
}
